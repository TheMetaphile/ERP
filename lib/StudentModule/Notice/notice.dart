import 'package:auto_size_text/auto_size_text.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shimmer/shimmer.dart';
import 'package:untitled/StudentModule/Notice/studentnotice/student_notice_bloc.dart';
import 'package:untitled/StudentModule/Notice/studentnotice/student_notice_event.dart';
import 'package:untitled/StudentModule/Notice/studentnotice/student_notice_state.dart';

import '../../CustomTheme/customTheme.dart';

class StudentNoticeScreen extends StatefulWidget {
  const StudentNoticeScreen({Key? key}) : super(key: key);

  @override
  State<StudentNoticeScreen> createState() => _StudentNoticeScreenState();
}

class _StudentNoticeScreenState extends State<StudentNoticeScreen>
    with SingleTickerProviderStateMixin, AutomaticKeepAliveClientMixin {
  final ScrollController _scrollController = ScrollController();
  late AnimationController _animationController;

  @override
  bool get wantKeepAlive => true;


  @override
  void initState() {
    super.initState();
    print('StudentNoticeScreen initState');
    _scrollController.addListener(() {});
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    print('Dispatching FetchNotices event after frame');
  /*  WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<StudentNoticeBloc>().add( FetchNotices(isRetry: false));
    });*/
  }

  @override
  void dispose() {
    print('StudentNoticeScreen dispose');
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }



  @override
  Widget build(BuildContext context) {
    super.build(context);
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: _buildAppBar(size),
      body: RefreshIndicator(
        onRefresh: () async {
          print('Pull-down refresh triggered, dispatching RefreshNotices');
          context.read<StudentNoticeBloc>().add(RefreshNotices());
          await context.read<StudentNoticeBloc>().stream.firstWhere(
                (state) => state is StudentNoticeLoaded || state is StudentNoticeError,
            orElse: () {
              print('Refresh timeout or unexpected state');
              return const StudentNoticeError(message: 'Refresh timed out');
            },
          );
        },
        child: Container(
          padding: const EdgeInsets.all(5),
          width: size.width,
          height: size.height,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: BlocBuilder<StudentNoticeBloc, StudentNoticeState>(
                  builder: (context, state) {
                    print('Building UI with state: $state');
                    if (state is StudentNoticeInitial || state is StudentNoticeLoading) {
                      return _buildShimmerEffect(size);
                    } else if (state is StudentNoticeLoaded || state is StudentNoticeLoadingMore) {
                      final notices = (state is StudentNoticeLoaded)
                          ? state.notices
                          : (state as StudentNoticeLoadingMore).notices;
                      final isLoadingMore = state is StudentNoticeLoadingMore;
                      if (notices.isEmpty) {
                        print('Notices empty, showing empty state');
                        return _buildEmptyState();
                      }
                      return AnimationLimiter(
                        child: ListView.builder(
                          controller: _scrollController,
                          physics: const AlwaysScrollableScrollPhysics(),
                          itemCount: notices.length + (isLoadingMore ? 1 : 0),
                          itemBuilder: (context, index) {
                            if (index < notices.length) {
                              return AnimationConfiguration.staggeredList(
                                position: index,
                                duration: const Duration(milliseconds: 375),
                                child: SlideAnimation(
                                  verticalOffset: 50.0,
                                  child: FadeInAnimation(
                                    child: _buildNoticeCard(notices[index], size),
                                  ),
                                ),
                              );
                            } else if (isLoadingMore) {
                              return Center(
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: LoadingAnimationWidget.threeArchedCircle(
                                    color: CustomTheme.primaryColor,
                                    size: 50,
                                  ),
                                ),
                              );
                            }
                            return const SizedBox.shrink();
                          },
                        ),
                      );
                    } else if (state is StudentNoticeError) {
                      print('Error state: ${state.message}');
                      WidgetsBinding.instance.addPostFrameCallback((_) {
                        showRedSnackBar(state.message, context);
                      });
                      return _buildEmptyState(errorMessage: state.message);
                    } else {
                      print('Unexpected state, showing empty state');
                      return _buildEmptyState();
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  AppBar _buildAppBar(Size size) {
    return AppBar(
      elevation: 0,
      backgroundColor: CustomTheme.primaryColor,
      leading: IconButton(
        icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        onPressed: () {
          print('Navigating back');
          Navigator.pop(context);
        },
      ),
      title: Text(
        "Notice Board",
        style: GoogleFonts.poppins(
          color: CustomTheme.blackColor,
          fontWeight: FontWeight.w500,
          fontSize: size.width * 0.05,
        ),
      ).animate().fadeIn(duration: 600.ms).slideX(begin: -0.2, end: 0),
    );
  }

  Widget _buildNoticeCard(dynamic notice, Size size) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        margin: const EdgeInsets.all(0),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(15),
          child: ExpansionTile(
            tilePadding: const EdgeInsets.all(16),
            expandedCrossAxisAlignment: CrossAxisAlignment.start,
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  notice["title"] ?? 'No Title',
                  style: GoogleFonts.poppins(
                    fontSize: size.width * 0.045,
                    fontWeight: FontWeight.w500,
                    color: CustomTheme.primaryColor,
                  ),
                ),
                SizedBox(height: size.height * 0.01),
                Row(
                  children: [
                    Hero(
                      tag: 'avatar_${notice["from"]?["profileLink"] ?? ''}',
                      child: ClipOval(
                        child: CachedNetworkImage(
                          imageUrl: notice["from"]?["profileLink"] ?? '',
                          width: size.width * 0.08,
                          height: size.width * 0.08,
                          fit: BoxFit.cover,
                          placeholder: (context, url) => SizedBox(
                            width: size.width * 0.08,
                            height: size.width * 0.08,
                            child: const CircularProgressIndicator(strokeWidth: 1.5),
                          ),
                          errorWidget: (context, url, error) {
                            print('Image loading error: $error for URL: $url');
                            return Icon(Icons.error, size: size.width * 0.08);
                          },
                        ),
                      ),
                    ),
                    SizedBox(width: size.width * 0.02),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            notice["from"]?["name"] ?? 'Unknown',
                            style: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.w500),
                          ),
                          Text(
                            notice["date"] ?? 'No Date',
                            style: GoogleFonts.poppins(fontSize: 12, color: Colors.grey),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  notice["description"] ?? 'No Description',
                  style: GoogleFonts.poppins(fontSize: 14),
                ),
              ),
            ],
          ),
        ),
      ).animate()
          .fadeIn(duration: 300.ms)
          .slideY(begin: 0.2, end: 0)
          .then()
          .shimmer(duration: 1200.ms, color: Colors.white.withOpacity(0.2)),
    );
  }

  Widget _buildShimmerEffect(Size size) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        itemCount: 5,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 16.0),
            child: Card(
              elevation: 5,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              child: Container(
                height: 120,
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      height: 18,
                      color: Colors.white,
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: 100,
                      height: 12,
                      color: Colors.white,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              width: 100,
                              height: 12,
                              color: Colors.white,
                            ),
                            const SizedBox(height: 4),
                            Container(
                              width: 80,
                              height: 10,
                              color: Colors.white,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildEmptyState({String? errorMessage}) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.notifications_off,
            size: 80,
            color: Colors.grey[400],
          ).animate()
              .fadeIn(duration: 600.ms)
              .scale(begin: const Offset(0, 0.5), end: const Offset(1, 1)),
          const SizedBox(height: 16),
          Text(
            errorMessage != null ? "Error Loading Notices" : "No Notices Found",
            style: GoogleFonts.poppins(
              fontSize: 18,
              color: Colors.grey[600],
              fontWeight: FontWeight.w500,
            ),
          ).animate()
              .fadeIn(duration: 600.ms)
              .slideY(begin: 0.2, end: 0),
          const SizedBox(height: 8),
          Text(
            errorMessage ?? "Check back later for updates",
            style: GoogleFonts.poppins(
              fontSize: 14,
              color: Colors.grey[400],
            ),
          ).animate()
              .fadeIn(duration: 600.ms, delay: 200.ms)
              .slideY(begin: 0.2, end: 0),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              print('Retry button pressed, dispatching FetchNotices');
              context.read<StudentNoticeBloc>().add( FetchNotices());
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: CustomTheme.primaryColor,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: Text(
              "Retry",
              style: GoogleFonts.poppins(color: CustomTheme.whiteColor),
            ),
          ),
        ],
      ),
    );
  }
}
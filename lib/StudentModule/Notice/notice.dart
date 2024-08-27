import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shimmer/shimmer.dart';

import '../../APIs/StudentModuleAPI/Notice/notice_API.dart';
import '../../CustomTheme/customTheme.dart';

// class Notice extends StatefulWidget {
//   const Notice({super.key});
//
//   @override
//   State<Notice> createState() => _NoticeState();
// }
//
// class _NoticeState extends State<Notice> {
//
//   String selectedFilter = 'For You';
//   NoticeBoardAPI apiObj = NoticeBoardAPI();
//   bool isLoading = false;
//   bool isLoadingMore = false;
//   int start = 0;
//   String session = "2024-25";
//   String status = "for";
//   List<dynamic> noticeData = [];
//   final ScrollController _scrollController = ScrollController();
//
//
//   TextEditingController title =TextEditingController();
//   TextEditingController description =TextEditingController();
//
//   Future<void> fetchNoticeData() async {
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//       List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start,);
//
//       setState(() {
//         noticeData = data;
//         start += data.length;
//       });
//     } catch (e) {
//       print('Error fetching noticeData data: $e');
//       showRedSnackBar('Failed to load noticeData. Please try again.', context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void> fetchMoreNoticeData() async {
//     if (isLoadingMore) return;
//
//     setState(() {
//       isLoadingMore = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       if (accessToken == null) {
//         throw Exception('Access token is null');
//       }
//       List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start, );
//
//       setState(() {
//         noticeData.addAll(data);
//         start += data.length;
//       });
//     } catch (e) {
//       print('Error fetching more noticeData: $e');
//       showRedSnackBar('Failed to load more notices. Please try again.', context);
//     } finally {
//       setState(() {
//         isLoadingMore = false;
//       });
//     }
//   }
//
//   @override
//   void initState() {
//     super.initState();
//     fetchNoticeData();
//     _scrollController.addListener(_scrollListener);
//   }
//   void _scrollListener() {
//     if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
//       fetchMoreNoticeData();
//     }
//   }
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     CustomTheme themeObj = CustomTheme(size);
//     return Scaffold(
//       backgroundColor:CustomTheme.whiteColor,
//       appBar: AppBar(
//           leading: IconButton(
//             onPressed: (){
//               Navigator.pop(context);
//             },
//             icon: Icon(Icons.arrow_back_ios,color:CustomTheme.blackColor,),
//           ),
//           backgroundColor: CustomTheme.primaryColor,
//           title: Text("Notice Board",style: TextStyle(color: CustomTheme.blackColor,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
//
//       ),
//
//       body: Container(
//         padding: const EdgeInsets.all(12),
//         width: size.width,
//         height: size.height*1,
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//
//             Expanded(
//               child: isLoading
//                   ? Center(
//                 child: LoadingAnimationWidget.threeArchedCircle(
//                   color: CustomTheme.primaryColor,
//                   size: 50,
//                 ),
//               ): noticeData.isEmpty?  Center(child: Text("No Notice Data Found", style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)
//                   : ListView.builder(
//                 controller: _scrollController,
//                 itemCount: noticeData.length + 1,
//                 itemBuilder: (context, index) {
//                   if (index < noticeData.length) {
//                     final notice = noticeData[index];
//                     print(noticeData.length);
//                     return _buildNoticeCard(notice, size,themeObj);
//                   } else if (isLoadingMore) {
//                     print(noticeData.length);
//                     print("load more");
//                     return Center(
//                       child: Padding(
//                           padding: const EdgeInsets.all(8.0),
//                           child: LoadingAnimationWidget.threeArchedCircle(
//                             color: CustomTheme.primaryColor,
//                             size: 50,
//                           )
//                       ),
//                     );
//                   } else {
//                     return const SizedBox.shrink();
//                   }
//                 },
//               ),
//             ),
//
//           ],
//         ),
//       ),
//     );
//   }
//
//
//   Widget _buildNoticeCard(dynamic notice, Size size,CustomTheme themeObj) {
//     return Column(
//       children: [
//         Card(
//           margin: const EdgeInsets.all(0),
//           elevation: 3,
//           child: ExpansionTile(
//             shape: Border.all(color: Colors.transparent),
//             title: Column(
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Row(
//                   children: [
//                     Text("Title: ", style:themeObj.bigNormalText),
//                     SizedBox(width: size.width * 0.02),
//                     SizedBox(
//                       width: size.width*0.5,
//                       child: AutoSizeText(notice["title"],overflow: TextOverflow.ellipsis, style: themeObj.normalText),
//                     ),
//                   ],
//                 ),
//                 SizedBox(height: size.height * 0.02),
//                 Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: [
//                     Row(
//                       children: [
//                         Text("By:", style: themeObj.normalText),
//                         SizedBox(width: size.width * 0.03),
//                         CircleAvatar(
//                           radius: size.width * 0.045,
//                           backgroundImage: NetworkImage(notice["from"]["profileLink"]),
//                         ),
//                         SizedBox(width: size.width * 0.02),
//                         Text(notice["from"]["name"], style:themeObj.normalText),
//                       ],
//                     ),
//                     Text(notice["date"], style: themeObj.normalText),
//                   ],
//                 ),
//               ],
//             ),
//             children: [
//               Padding(
//                 padding: EdgeInsets.all(size.height * 0.02),
//                 child: SizedBox(
//                   width: size.width,
//                   child: Column(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Text("Description:",textAlign: TextAlign.start, style:themeObj.bigNormalText),
//                       SizedBox(height: size.height * 0.01),
//                       AutoSizeText(
//                         notice["description"],textAlign: TextAlign.start,
//                         style: themeObj.normalText,
//                       ),
//                     ],
//                   ),
//                 ),
//               ),
//             ],
//           ),
//         ),
//         SizedBox(height: size.height * 0.02)
//       ],
//     );
//   }
//
// }


class Notice extends StatefulWidget {
  const Notice({Key? key}) : super(key: key);

  @override
  State<Notice> createState() => _NoticeState();
}

class _NoticeState extends State<Notice> with SingleTickerProviderStateMixin {
  NoticeBoardAPI apiObj = NoticeBoardAPI();
  bool isLoading = false;
  bool isLoadingMore = false;
  int start = 0;
  List<dynamic> noticeData = [];
  final ScrollController _scrollController = ScrollController();
  late AnimationController _animationController;

  Future<void> fetchNoticeData() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start);

      setState(() {
        noticeData = data;
        start += data.length;
      });
    } catch (e) {
      print('Error fetching noticeData data: $e');
      showRedSnackBar('Failed to load noticeData. Please try again.', context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreNoticeData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start);

      setState(() {
        noticeData.addAll(data);
        start += data.length;
      });
    } catch (e) {
      print('Error fetching more noticeData: $e');
      showRedSnackBar('Failed to load more notices. Please try again.', context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchNoticeData();
    _scrollController.addListener(_scrollListener);
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreNoticeData();
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: _buildAppBar(size),
      body: RefreshIndicator(
        onRefresh: () async {
          await fetchNoticeData();
        },
        child: Container(
          padding: const EdgeInsets.all(5),
          width: size.width,
          height: size.height,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: isLoading
                    ? _buildShimmerEffect(size)
                    : noticeData.isEmpty
                    ? _buildEmptyState()
                    : AnimationLimiter(
                  child: ListView.builder(
                    controller: _scrollController,
                    itemCount: noticeData.length + 1,
                    itemBuilder: (context, index) {
                      if (index < noticeData.length) {
                        return AnimationConfiguration.staggeredList(
                          position: index,
                          duration: const Duration(milliseconds: 375),
                          child: SlideAnimation(
                            verticalOffset: 50.0,
                            child: FadeInAnimation(
                              child: _buildNoticeCard(noticeData[index], size, themeObj),
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
                      } else {
                        return const SizedBox.shrink();
                      }
                    },
                  ),
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
        onPressed: () => Navigator.pop(context),
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

  Widget _buildNoticeCard(dynamic notice, Size size, CustomTheme themeObj) {
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
                  notice["title"],
                  style: GoogleFonts.poppins(
                    fontSize: size.width*0.045,
                    fontWeight: FontWeight.w500,
                    color: CustomTheme.primaryColor,
                  ),
                ),
                SizedBox(height: size.height * 0.01),
                Row(
                  children: [
                    Hero(
                      tag: 'avatar_${notice["from"]["profileLink"]}',
                      child: CircleAvatar(
                        radius: size.width * 0.04,
                        backgroundImage: NetworkImage(notice["from"]["profileLink"]),
                      ),
                    ),
                    SizedBox(width: size.width * 0.02),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            notice["from"]["name"],
                            style: GoogleFonts.poppins(fontSize: 14, fontWeight: FontWeight.w500),
                          ),
                          Text(
                            notice["date"],
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
                  notice["description"],
                  style: GoogleFonts.poppins(fontSize: 14),
                ),
              ),
            ],
          ),
        ),
      ).animate()
          .fadeIn(duration: 300.ms)
          .slideY(begin: 0.2, end: 0)
          .then() // Add a sequential animation
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

  Widget _buildEmptyState() {
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
              .scale(begin: Offset(0, 0.5), end: Offset(0, 3)),
          const SizedBox(height: 16),
          Text(
            "No Notices Found",
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
            "Check back later for updates",
            style: GoogleFonts.poppins(
              fontSize: 14,
              color: Colors.grey[400],
            ),
          ).animate()
              .fadeIn(duration: 600.ms, delay: 200.ms)
              .slideY(begin: 0.2, end: 0),
        ],
      ),
    );
  }
}

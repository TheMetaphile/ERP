import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import '../utils/theme.dart';
import '../Charts/classprogressGraph.dart';
import 'TeacherDashboardBloc/teacher_dashboard_bloc.dart';
import 'TeacherDashboardBloc/teacher_dashboard_event.dart';
import 'TeacherDashboardBloc/teacher_dashboard_state.dart';


class TeacherDashboard extends StatefulWidget {
  const TeacherDashboard({super.key});

  @override
  State<TeacherDashboard> createState() => _TeacherDashboardState();
}

class _TeacherDashboardState extends State<TeacherDashboard> with SingleTickerProviderStateMixin {
  CustomTheme themeObj = CustomTheme();
  late AnimationController _controller;
  late Animation<double> _animation;
  bool _hasTriggeredInitialLoad = false;

  List<String> cardImage = [
    "assets/Images/TeacherDashboard/subject.png",
    "assets/Images/TeacherDashboard/class.png",
    "assets/Images/TeacherDashboard/student.png",
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    _controller.forward();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Only trigger initial load once when the widget is first built
    if (!_hasTriggeredInitialLoad) {
      final bloc = context.read<TeacherDashboardBloc>();
      if (!bloc.hasLoadedInitially) {
        bloc.add(LoadTeacherDetails());
      }
      _hasTriggeredInitialLoad = true;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _onRefresh() async {
    context.read<TeacherDashboardBloc>().add(RefreshTeacherDashboard());

    // Wait for the refresh to complete
    await context.read<TeacherDashboardBloc>().stream.firstWhere(
          (state) => state is TeacherDashboardLoaded || state is TeacherDashboardError,
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: SafeArea(
        child: BlocBuilder<TeacherDashboardBloc, TeacherDashboardState>(
          builder: (context, state) {
            if (state is TeacherDashboardLoading) {
              return const Center(child: CircularProgressIndicator());
            } else if (state is TeacherDashboardLoaded) {
              final teacherName = state.teacherName ?? 'Teacher';
              return RefreshIndicator(
                onRefresh: _onRefresh,
                color: Colors.orange,
                backgroundColor: Colors.white,
                child: SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(), // This ensures pull-to-refresh works even when content doesn't fill the screen
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: _buildWelcomeMessage(size, teacherName),
                      ),
                      SizedBox(height: size.height * 0.02),
                      Padding(
                        padding: const EdgeInsets.all(13.0),
                        child: _buildCardGrid(size, state.cards),
                      ),
                      SizedBox(height: size.height * 0.01),
                      _buildClassProgressGraph(),
                      SizedBox(height: size.height * 0.01),
                      _buildAttendanceSummary(size, state.attendance),
                      // Add some bottom padding to ensure proper scrolling
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              );
            } else if (state is TeacherDashboardError) {
              return RefreshIndicator(
                onRefresh: _onRefresh,
                color: Colors.orange,
                child: SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  child: Container(
                    height: MediaQuery.of(context).size.height - 100,
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.error_outline, size: 64, color: Colors.red),
                          const SizedBox(height: 16),
                          Text('Error: ${state.message}'),
                          const SizedBox(height: 16),
                          ElevatedButton(
                            onPressed: () => _onRefresh(),
                            child: const Text('Retry'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            } else {
              return RefreshIndicator(
                onRefresh: _onRefresh,
                color: Colors.orange,
                child: const SingleChildScrollView(
                  physics: AlwaysScrollableScrollPhysics(),
                  child: Center(
                    child: Padding(
                      padding: EdgeInsets.all(20.0),
                      child: Text('Please wait...'),
                    ),
                  ),
                ),
              );
            }
          },
        ),
      ),
    );
  }

  Widget _buildWelcomeMessage(Size size, String teacherName) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, 4 * _controller.value),
          child: child,
        );
      },
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "Welcome back, ",
              style: GoogleFonts.openSans(
                color: Colors.black87,
                fontWeight: FontWeight.w500,
                fontSize: size.width * 0.055,
              ),
            ),
            TextSpan(
              text: teacherName,
              style: GoogleFonts.openSans(
                color: Colors.orange,
                fontWeight: FontWeight.w600,
                fontSize: size.width * 0.06,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCardGrid(Size size, List<CardInfo> cards) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: cards.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        childAspectRatio: 1.3,
        crossAxisCount: 2,
        crossAxisSpacing: size.width * 0.02,
        mainAxisSpacing: size.width * 0.02,
      ),
      itemBuilder: (context, index) {
        final card = cards[index];
        return AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.scale(
              scale: _animation.value,
              child: Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: InkWell(
                  onTap: () {
                    // TODO: Implement card action
                  },
                  child: Container(
                    padding: const EdgeInsets.all(5),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          cardImage[index],
                          height: size.height * 0.05,
                          color: Colors.orange,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          card.type,
                          style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black87),
                        ),
                        Text(
                          card.number,
                          style: GoogleFonts.openSans(fontSize: size.width * 0.05, color: Colors.black, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildClassProgressGraph() {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: 1),
        duration: const Duration(seconds: 1),
        builder: (context, value, child) {
          return const ClassProgressGrapth();
        },
      ),
    );
  }

  Widget _buildAttendanceSummary(Size size, List<AttendanceEntry> attendance) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Attendance Summary",
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.openSans(
                    fontSize: size.width * 0.045,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                _buildMonthSelector(),
              ],
            ),
            const SizedBox(height: 16),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: _buildAttendanceTable(size, attendance),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMonthSelector() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 1, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.orange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.arrow_back_ios, size: 14, color: Colors.orange),
          const SizedBox(width: 8),
          Text(
            "April 2024",
            style: GoogleFonts.openSans(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Colors.orange,
            ),
          ),
          const SizedBox(width: 2),
          const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.orange),
        ],
      ),
    );
  }

  Widget _buildAttendanceTable(Size size, List<AttendanceEntry> attendance) {
    return Column(
      children: [
        _buildTableHeader(size),
        const SizedBox(height: 8),
        ...attendance.map((data) {
          return Container(
            padding: const EdgeInsets.symmetric(vertical: 12),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.grey.withOpacity(0.2))),
            ),
            child: Row(
              children: [
                _buildRowCell(size, data.date, 0.23),
                _buildRowCell(size, data.checkIn, 0.23),
                _buildRowCell(size, data.checkOut, 0.23),
                _buildRowCell(size, data.workingHours, 0.23),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }

  Widget _buildTableHeader(Size size) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        color: Colors.orange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          _buildHeaderCell(size, "Date", 0.23),
          _buildHeaderCell(size, "Check-In", 0.23),
          _buildHeaderCell(size, "Check-Out", 0.23),
          _buildHeaderCell(size, "Working Hrs", 0.23),
        ],
      ),
    );
  }

  Widget _buildHeaderCell(Size size, String text, double widthFactor) {
    return SizedBox(
      width: size.width * widthFactor,
      child: Text(
        text,
        overflow: TextOverflow.ellipsis,
        textAlign: TextAlign.center,
        style: GoogleFonts.openSans(
          fontSize: size.width * 0.035,
          fontWeight: FontWeight.w600,
          color: Colors.orange,
        ),
      ),
    );
  }

  Widget _buildRowCell(Size size, String text, double widthFactor) {
    return SizedBox(
      width: size.width * widthFactor,
      child: Text(
        text,
        overflow: TextOverflow.ellipsis,
        textAlign: TextAlign.center,
        style: GoogleFonts.openSans(
          fontSize: size.width * 0.03,
          color: Colors.black87,
        ),
      ),
    );
  }
}

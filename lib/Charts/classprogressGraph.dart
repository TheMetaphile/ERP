import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ClassProgressGrapth extends StatefulWidget {
  const ClassProgressGrapth({super.key});

  @override
  State<ClassProgressGrapth> createState() => _ClassProgressGrapthState();
}

class _ClassProgressGrapthState extends State<ClassProgressGrapth> {
  final List<FlSpot> performancefactor = [
    FlSpot(0, 4),
    FlSpot(1, 3),
    FlSpot(2, 0),
    FlSpot(3, 4),
  ];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Class Performance", style: GoogleFonts.openSans(fontSize: size.width * 0.05, color: Colors.black, fontWeight: FontWeight.w500)),
          SizedBox(height: size.height * 0.03),
          Padding(
            padding: const EdgeInsets.only(right: 5.0),
            child: AspectRatio(
              aspectRatio: 1.3,
              child: LineChart(
                LineChartData(
                  lineTouchData: LineTouchData(enabled: true),
                  gridData: FlGridData(
                    show: true,
                    drawVerticalLine: true,
                    getDrawingHorizontalLine: (value) {
                      return FlLine(
                        color: Colors.grey.withOpacity(0.3),
                        strokeWidth: 1,
                      );
                    },
                    getDrawingVerticalLine: (value) {
                      return FlLine(
                        color: Colors.grey.withOpacity(0.3),
                        strokeWidth: 1,
                      );
                    },
                  ),
                  titlesData: FlTitlesData(
                    show: true,
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: getBottomTitles,
                        reservedSize: 42,
                      ),
                    ),
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: getLeftTitles,
                        reservedSize: 42,
                      ),
                    ),
                    topTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    rightTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                  ),
                  borderData: FlBorderData(
                    show: true,
                    border: Border.all(color: Colors.grey, width: 1),
                  ),
                  minX: 0,
                  maxX: 3,
                  minY: 0,
                  maxY: 4,
                  lineBarsData: [
                    LineChartBarData(
                      spots: performancefactor,
                      isCurved: true,
                      color: Color.fromRGBO(125,197,245,1),
                      barWidth: 4,
                      isStrokeCapRound: true,
                      dotData: FlDotData(
                        show: false,
                      ),
                      // belowBarData: BarAreaData(
                      //   show: true,
                      //   color: Colors.green.withOpacity(0.2),
                      // ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget getBottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.w600,
      fontSize: 10,
    );
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 8,
      child: const Text('Class\n 2nd', textAlign: TextAlign.center, style: style),
    );
  }

  Widget getLeftTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.w400,
      fontSize: 14,
    );
    String text;
    switch (value.toInt()) {
      case 0:
        text = '2.0';
        break;
      case 1:
        text = '2.5';
        break;
      case 2:
        text = '3.0';
        break;
      case 3:
        text = '3.5';
        break;
      case 4:
        text = '4.0';
        break;
      default:
        return Container();
    }
    return SideTitleWidget(
      axisSide: AxisSide.left,
      space: 8,
      child: Text(text, style: style),
    );
  }
}
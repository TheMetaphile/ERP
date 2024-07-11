import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SchoolPerformanceChart extends StatelessWidget {
  final List<FlSpot> thisWeekData = [
    FlSpot(0, 40),
    FlSpot(2, 120),
    FlSpot(3, 195),
    FlSpot(4, 150),
    FlSpot(5, 225),
    FlSpot(6, 250),
  ];

  final List<FlSpot> lastWeekData = [
    FlSpot(0, 10),
    FlSpot(2,25),
    FlSpot(3, 110),
    FlSpot(4, 120),
    FlSpot(5, 165),
    FlSpot(6, 210),
  ];

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 8.0),
            child: Text("School Performance",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w500),),
          ),
          SizedBox(height: size.height*0.03,),
          AspectRatio(
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
                maxX: 7,
                minY: 0,
                maxY: 250,
                lineBarsData: [
                  LineChartBarData(
                    spots: thisWeekData,
                    isCurved: true,
                    color: Colors.green,
                    barWidth: 4,
                    isStrokeCapRound: true,
                    dotData: FlDotData(
                      show: false,
                    ),
                    belowBarData: BarAreaData(
                      show: true,
                      color: Colors.green.withOpacity(0.2),
                    ),
                  ),
                  LineChartBarData(
                    spots: lastWeekData,
                    isCurved: true,
                    color: Colors.red,
                    barWidth: 4,
                    isStrokeCapRound: true,
                    dotData: FlDotData(
                      show: false,
                    ),
                    belowBarData: BarAreaData(
                      show: true,
                      color: Colors.red.withOpacity(0.2),
                    ),
                  ),
                ],
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
    Widget text;
    switch (value.toInt()) {
      case 0:
        text = const Text('Week\n0',textAlign: TextAlign.center, style: style);
        break;
      case 1:
        text = const Text('Week\n01',textAlign: TextAlign.center, style: style);
        break;
      case 2:
        text = const Text('Week\n02',textAlign: TextAlign.center, style: style);
        break;
      case 3:
        text = const Text('Week\n03',textAlign: TextAlign.center, style: style);
        break;
      case 4:
        text = const Text('Week\n04', textAlign: TextAlign.center,style: style);
        break;
      case 5:
        text = const Text('Week\n05',textAlign: TextAlign.center, style: style);
        break;
      case 6:
        text = const Text('Week\n06',textAlign: TextAlign.center, style: style);
        break;
      default:
        text = const Text('', style: style);
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 8,
      child: text,
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
        text = '0k';
        break;
      case 50:
        text = '50k';
        break;
      case 100:
        text = '100k';
        break;
      case 150:
        text = '150k';
        break;
      case 200:
        text = '200k';
        break;
      case 250:
        text = '250k';
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
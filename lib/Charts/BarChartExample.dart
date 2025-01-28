import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ExpensesChart extends StatefulWidget {
  @override
  State<ExpensesChart> createState() => _ExpensesChartState();
}

class _ExpensesChartState extends State<ExpensesChart> {
  final List<double> expenses = [130.0, 150.0, 100.0];
  double totalHeight=200;
  int touchedIndex = -1;
  final Color touchedBarColor = Colors.green;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: Text("Expenses",style: GoogleFonts.openSans(fontSize:size.width*0.05,color:Colors.black,fontWeight:FontWeight.w500),),
        ),
        SizedBox(height: size.height*0.03,),
        AspectRatio(
          aspectRatio: 1.3,
          child: BarChart(
            BarChartData(
              barTouchData: BarTouchData(
                touchTooltipData: BarTouchTooltipData(
                  // tooltipBgColor: Colors.blueGrey,
                  // tooltipHorizontalAlignment: FLHorizontalAlignment.right,
                  tooltipMargin: -10,
                  getTooltipItem: (group, groupIndex, rod, rodIndex) {
                    String date;
                    switch (group.x) {
                      case 0:
                        date = 'Jan 2024';
                        break;
                      case 1:
                        date = 'Feb 2024';
                        break;
                      case 2:
                        date = 'Mar 2024';
                        break;
                      default:
                        throw Error();
                    }
                    return BarTooltipItem(
                      '$date\n',
                      TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w400,
                        fontSize: size.width*0.035,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text: "${(rod.toY - 1).toString()}K",
                          style:  TextStyle(
                            color: Colors.white, //widget.touchedBarColor,
                            fontSize: size.width*0.04,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    );
                  },
                ),
                touchCallback: (FlTouchEvent event, barTouchResponse) {
                  setState(() {
                    if (!event.isInterestedForInteractions ||
                        barTouchResponse == null ||
                        barTouchResponse.spot == null) {
                      touchedIndex = -1;
                      return;
                    }
                    touchedIndex = barTouchResponse.spot!.touchedBarGroupIndex;
                  });
                },
              ),
              titlesData: FlTitlesData(
                show: true,
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: getBottomTitles,
                  ),
                ),
                leftTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: getLeftTitles,
                    reservedSize: 38,
                    interval: 1,
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
                border: Border(
                    left: BorderSide(color: Colors.grey),
                    bottom: BorderSide(color: Colors.grey,),

                )
              ),
              gridData: FlGridData(
                drawVerticalLine: false,
                horizontalInterval: 40.0,
              ),
              barGroups: [
                BarChartGroupData(
                  x: 0,
                  barRods: [
                    BarChartRodData(
                      borderRadius: BorderRadius.only(topRight: Radius.circular(8),topLeft: Radius.circular(8)),
                      toY: expenses[0],
                      color: Colors.yellow,
                      width: 22,
                      backDrawRodData: BackgroundBarChartRodData(
                        show: true,
                        toY: totalHeight,
                        color: Colors.grey[300],
                      ),
                    ),
                  ],
                ),
                BarChartGroupData(
                  x: 1,
                  barRods: [
                    BarChartRodData(
                      borderRadius: BorderRadius.only(topRight: Radius.circular(8),topLeft: Radius.circular(8)),
                      toY: expenses[1],
                      color: Colors.green,
                      width: 22,
                      backDrawRodData: BackgroundBarChartRodData(
                        show: true,
                        toY: totalHeight,
                        color: Colors.grey[300],
                      ),
                    ),
                  ],
                ),
                BarChartGroupData(
                  x: 2,
                  barRods: [
                    BarChartRodData(
                      borderRadius: BorderRadius.only(topRight: Radius.circular(8),topLeft: Radius.circular(8)),

                      toY: expenses[2],
                      color: Colors.orange,
                      width: 22,
                      backDrawRodData: BackgroundBarChartRodData(
                        show: true,
                        toY: totalHeight,
                        color: Colors.grey[300],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
  Widget getBottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.w500,
      fontSize: 14,
    );
    Widget text;
    switch (value.toInt()) {
      case 0:
        text = const Text('Jan 2024', style: style);
        break;
      case 1:
        text = const Text('Feb 2024', style: style);
        break;
      case 2:
        text = const Text('Mar 2024', style: style);
        break;
      default:
        text = const Text('', style: style);
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 4,
      child: text,
    );
  }

  Widget getLeftTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.w500,
      fontSize: 14,
    );
    String text;
    switch (value.toInt()) {
      case 0:
        text = '0';
        break;
      case 40:
        text="40k";
        break;
      case 80:
        text = '80k';
        break;
      case 120:
        text = '120k';
        break;
      case 160:
        text = '160k';
        break;
      case 200:
        text = '200k';
        break;
      case 240:
        text = '240k';
        break;
      case 280:
        text = '280k';
        break;
      case 320:
        text = '320k';
        break;
      default:
        return Container();
    }
    return SideTitleWidget(
      axisSide: AxisSide.left,
      space: 4,
      child: Text(text, style: style),
    );
  }
}
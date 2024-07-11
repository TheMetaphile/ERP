import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class ClassActivityChart extends StatelessWidget {
  final List<BarData> barData = [
    BarData(
      subject: 'Math',
      value: 16,
      color: Colors.orange,
    ),
    BarData(
      subject: 'Science',
      value: 20,
      color: Colors.blue,
    ),
    BarData(
      subject: 'English',
      value: 12,
      color: Colors.green,
    ),
  ];

  ClassActivityChart({super.key});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        maxY: 30,
        barTouchData: BarTouchData(enabled: false),
        titlesData: FlTitlesData(
          show: true,
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget:getbottomTitles
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false),
        )
        ),
        borderData: FlBorderData(show: false),
        barGroups: barData.asMap().entries.map((entry) {
          final index = entry.key;
          final data = entry.value;
          return BarChartGroupData(
            x: index,
            barRods: [
              BarChartRodData(
                toY: data.value.toDouble(),
                color: data.color,
              ),
            ],
          );
        }).toList(),
      ),
    );
  }
   Widget getbottomTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.w500,
      fontSize: 14,
    );
    String text="January";

    return SideTitleWidget(
      axisSide: AxisSide.left,
      space: 4,
      child: Text(text, style: style),
    );
  }
}

class BarData {
  final String subject;
  final double value;
  final Color color;

  BarData({
    required this.subject,
    required this.value,
    required this.color,
  });
}
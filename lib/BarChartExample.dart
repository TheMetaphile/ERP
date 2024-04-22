import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class BarChartExample extends StatelessWidget {
  final List<double> data = [4.0, 8.0, 10.0, 4.0, 8.0];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BarChart(
        BarChartData(
          barTouchData: BarTouchData(
            enabled: false,
          ),
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (double value, TitleMeta meta) {
                  switch (value.toInt()) {
                    case 0:
                      return Text('2020');
                    case 1:
                      return Text('2021');
                    case 2:
                      return Text('2022');
                    case 3:
                      return Text('2023');
                    case 4:
                      return Text('2024');
                    default:
                      return Container();
                  }
                },
              ),
            ),
          ),
          borderData: FlBorderData(
            show: false,
          ),
          barGroups: List.generate(
            data.length,
                (index) => BarChartGroupData(
              x: index,
              barRods: [
                BarChartRodData(
                  fromY: 0,
                  color: Colors.red,
                  width: 22, toY:  data[index],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

import '../Charts/BarChartExample.dart';

class Statics extends StatefulWidget {
  const Statics({super.key});

  @override
  State<Statics> createState() => _StaticsState();
}

class _StaticsState extends State<Statics> with TickerProviderStateMixin{
  final List<Map<String, dynamic>> _budgetCategories = [
    {'name': 'Transportation', 'debit': '₹ 10,000', 'date':'14-05-2003','time':'08:20am'},
    {'name': 'Bills & Utilities', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Electricity', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Furniture', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},
    {'name': 'Fuel', 'debit': '₹ 20000','date':'14-05-2003','time':'08:20am'},

  ];
  List<String> paymentTypeImages=[
    "assets/Images/Payment Images/Transportation.png",
    "assets/Images/Payment Images/Bills.png",
    "assets/Images/Payment Images/Electricity.png",
    "assets/Images/Payment Images/Furniture.png",
    "assets/Images/Payment Images/Fuel Gas.png",
  ];
  late TabController tabBarController;
  @override
  void initState() {
    super.initState();
    tabBarController = TabController(length: 3, vsync: this);
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar:AppBar(
        title: Center(
          child: Text("Statics", style: TextStyle(
            color: Colors.black,
            fontSize: size.height*0.035,
            fontWeight: FontWeight.w400,
          ),),
        ),
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height*0.03,),
              TabBar(
                controller: tabBarController,
                dividerColor: Colors.transparent,
                tabs: [
                  Text(
                    "Week",
                    style: GoogleFonts.openSans(
                    fontSize: size.width * 0.035,
                        color: Colors.black,
                        fontWeight:FontWeight.w500
                    ),
                  ),
                  Text(
                    "Month",
                    style: GoogleFonts.openSans(
                        fontSize: size.width * 0.035,
                        color: Colors.black,
                        fontWeight:FontWeight.w500
                    ),
                  ),
                  Text(
                    "Year",
                    style: GoogleFonts.openSans(
                        fontSize: size.width * 0.035,
                        color: Colors.black,
                        fontWeight:FontWeight.w500
                    ),
                  ),

                ],
              ),
              Container(
                width: size.width,
                height: size.height,
                child: TabBarView(
                    controller: tabBarController,
                    children: [
                      Column(
                        children: [
                          Divider( color: Colors.black,height: 1, thickness: 2,),
                        AspectRatio(
                          aspectRatio: 1.6,
                          child: BarChartWeek(),
                        ),
                          SizedBox(height: size.height*0.035,),
                          Text("Expenses",style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight: FontWeight.w600),),
                          Flexible(
                            child: ListView.builder(
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              itemCount: _budgetCategories .length,
                              itemBuilder: (context, index) {
                                final category = _budgetCategories[index];
                                return Column(
                                  children: [
                                    ListTile(
                                      leading: Image.asset(paymentTypeImages[index],height: size.height*0.08,width: size.width*0.1,),
                                      title: Text(category['name'],style: TextStyle(fontSize: size.height*0.02,color: Colors.black,fontWeight: FontWeight.w400),),
                                      subtitle: Row(
                                        children: [
                                          Text(category['date'],style: TextStyle(color: Colors.grey),),
                                          Expanded(child: SizedBox()),
                                          Text(category['time'],style: TextStyle(color: Colors.grey)),
                                        ],
                                      ),
                                      trailing:  Column(
                                        children: [
                                          Text(category['debit'],style: TextStyle(fontSize: size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),),
                                          Text('Debit',style: TextStyle(color: Colors.grey),)
                                        ],
                                      ),
                                      onTap: (){
                                      },
                                    ),
                                    Divider( color: Colors.grey,height: 1, thickness: 1,),
                                  ],
                                );
                              },
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Divider( color: Colors.black,height: 1, thickness: 2,),
                        AspectRatio(
                          aspectRatio: 1.6,
                          child: BarChartMonth(),
                        ),
                          SizedBox(height: size.height*0.035,),
                          Text("Expenses",style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight: FontWeight.w600),),
                          Flexible(
                            child: ListView.builder(
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              itemCount: _budgetCategories .length,
                              itemBuilder: (context, index) {
                                final category = _budgetCategories[index];
                                return Column(
                                  children: [
                                    ListTile(
                                      leading: Image.asset(paymentTypeImages[index],height: size.height*0.08,width: size.width*0.1,),
                                      title: Text(category['name'],style: TextStyle(fontSize: size.height*0.02,color: Colors.black,fontWeight: FontWeight.w400),),
                                      subtitle: Row(
                                        children: [
                                          Text(category['date'],style: TextStyle(color: Colors.grey),),
                                          Expanded(child: SizedBox()),
                                          Text(category['time'],style: TextStyle(color: Colors.grey)),
                                        ],
                                      ),
                                      trailing:  Column(
                                        children: [
                                          Text(category['debit'],style: TextStyle(fontSize: size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),),
                                          Text('Debit',style: TextStyle(color: Colors.grey),)
                                        ],
                                      ),
                                      onTap: (){
                                      },
                                    ),
                                    Divider( color: Colors.grey,height: 1, thickness: 1,),
                                  ],
                                );
                              },
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Divider( color: Colors.black,height: 1, thickness: 2,),
                        AspectRatio(
                          aspectRatio: 1.6,
                          child: BarChartYear(),
                        ),
                          SizedBox(height: size.height*0.035,),
                          Text("Expenses",style: TextStyle(color: Colors.black,fontSize: size.height*0.02,fontWeight: FontWeight.w600),),
                          Flexible(
                            child: ListView.builder(
                              shrinkWrap: true,
                              physics: NeverScrollableScrollPhysics(),
                              itemCount: _budgetCategories .length,
                              itemBuilder: (context, index) {
                                final category = _budgetCategories[index];
                                return Column(
                                  children: [
                                    ListTile(
                                      leading: Image.asset(paymentTypeImages[index],height: size.height*0.08,width: size.width*0.1,),
                                      title: Text(category['name'],style: TextStyle(fontSize: size.height*0.02,color: Colors.black,fontWeight: FontWeight.w400),),
                                      subtitle: Row(
                                        children: [
                                          Text(category['date'],style: TextStyle(color: Colors.grey),),
                                          Expanded(child: SizedBox()),
                                          Text(category['time'],style: TextStyle(color: Colors.grey)),
                                        ],
                                      ),
                                      trailing:  Column(
                                        children: [
                                          Text(category['debit'],style: TextStyle(fontSize: size.height*0.02,color: Colors.red,fontWeight: FontWeight.bold),),
                                          Text('Debit',style: TextStyle(color: Colors.grey),)
                                        ],
                                      ),
                                      onTap: (){
                                      },
                                    ),
                                    Divider( color: Colors.grey,height: 1, thickness: 1,),
                                  ],
                                );
                              },
                            ),
                          ),
                        ],
                      ),

                    ]
                ),
              )


            ],
          ),
        ),
      ),
    );
  }
}

class BarChartWeek extends StatelessWidget {
  const BarChartWeek();

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        barTouchData: barTouchData,
        titlesData: titlesData,
        borderData: borderData,
        barGroups: barGroups,
        gridData:  FlGridData(show: false),
        alignment: BarChartAlignment.spaceAround,
        maxY: 30,
      ),
    );
  }

  BarTouchData get barTouchData => BarTouchData(
    enabled: false,
    touchTooltipData: BarTouchTooltipData(
      // getTooltipColor: (group) => Colors.transparent,
      tooltipPadding: EdgeInsets.all(0),
      tooltipMargin: 0,
      tooltipRoundedRadius: 12,
      tooltipBgColor: Colors.transparent,
      getTooltipItem: (
          BarChartGroupData group,
          int groupIndex,
          BarChartRodData rod,
          int rodIndex,
          ) {
        return BarTooltipItem(
          "${rod.toY.round().toString()}"+"k",
          const TextStyle(
            color:Colors.black,
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        );
      },
    ),
  );

  Widget getTitles(double value, TitleMeta meta) {
    final style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.bold,
      fontSize: 15,
    );
    String text;
    switch (value.toInt()) {
      case 0:
        text = 'Mon';
        break;
      case 1:
        text = 'Tue';
        break;
      case 2:
        text = 'Wed';
        break;
      case 3:
        text = 'Thu';
        break;
      case 4:
        text = 'Fri';
        break;
      case 5:
        text = 'Sat';
        break;
      case 6:
        text = 'Sun';
        break;
      default:
        text = '';
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 2,
      child: Text(text, style: style),
    );
  }

  FlTitlesData get titlesData => FlTitlesData(
    show: true,
    bottomTitles: AxisTitles(
      sideTitles: SideTitles(
        showTitles: true,
        reservedSize: 30,
        getTitlesWidget: getTitles,
      ),
    ),
    leftTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    topTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    rightTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
  );

  FlBorderData get borderData => FlBorderData(
    show: false,
  );

  LinearGradient get _barsGradient => LinearGradient(
    colors: [
      Colors.green,
      Colors.cyan,
    ],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );

  List<BarChartGroupData> get barGroups => [
    BarChartGroupData(
      x: 0,
      barRods: [
        BarChartRodData(
            toY: 5,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 1,
      barRods: [
        BarChartRodData(
            toY: 10,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 2,
      barRods: [
        BarChartRodData(
            toY: 20,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 3,
      barRods: [
        BarChartRodData(
            toY: 10,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 4,
      barRods: [
        BarChartRodData(
            toY: 20,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 5,
      barRods: [
        BarChartRodData(
            toY: 12,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 6,
      barRods: [
        BarChartRodData(
            toY: 13,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
  ];
}

class BarChartMonth extends StatelessWidget {
  const BarChartMonth();

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        barTouchData: barTouchData,
        titlesData: titlesData,
        borderData: borderData,
        barGroups: barGroups,
        gridData:  FlGridData(show: false),
        alignment: BarChartAlignment.spaceAround,
        maxY: 30,
      ),
    );
  }

  BarTouchData get barTouchData => BarTouchData(
    enabled: false,
    touchTooltipData: BarTouchTooltipData(
      // getTooltipColor: (group) => Colors.transparent,
      tooltipPadding: EdgeInsets.all(0),
      tooltipMargin: 0,
      tooltipRoundedRadius: 12,
      tooltipBgColor: Colors.transparent,
      getTooltipItem: (
          BarChartGroupData group,
          int groupIndex,
          BarChartRodData rod,
          int rodIndex,
          ) {
        return BarTooltipItem(
          "${rod.toY.round().toString()}"+"k",
          const TextStyle(
            color:Colors.black,
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        );
      },
    ),
  );

  Widget getTitles(double value, TitleMeta meta) {
    final style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.bold,
      fontSize: 15,
    );
    String text;
    int index = value.toInt();

    switch (index) {
      case 0:
        text = 'Jan';
        break;
      case 1:
        text = 'Feb';
        break;
      case 2:
        text = 'Mar';
        break;
      case 3:
        text = 'Apr';
        break;
      case 4:
        text = 'May';
        break;
      case 5:
        text = 'Jun';
        break;
      case 6:
        text = 'Jul';
        break;
      case 7:
        text = 'Aug';
        break;
      case 8:
        text = 'Sep';
        break;
      case 9:
        text = 'Oct';
        break;
      case 10:
        text = 'Nov';
        break;
      case 11:
        text = 'Dec';
        break;
      default:
        text = '';
    }

    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 2,
      child: Text(text, style: style),
    );
  }
  FlTitlesData get titlesData => FlTitlesData(
    show: true,
    bottomTitles: AxisTitles(
      sideTitles: SideTitles(
        showTitles: true,
        reservedSize: 30,
        getTitlesWidget: getTitles,
      ),
    ),
    leftTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    topTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    rightTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
  );

  FlBorderData get borderData => FlBorderData(
    show: false,
  );

  LinearGradient get _barsGradient => LinearGradient(
    colors: [
      Colors.green,
      Colors.cyan,
    ],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );

  List<BarChartGroupData> get barGroups => [
    BarChartGroupData(
      x: 0,
      barRods: [
        BarChartRodData(
            toY: 5,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 1,
      barRods: [
        BarChartRodData(
            toY: 10,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 2,
      barRods: [
        BarChartRodData(
            toY: 20,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 3,
      barRods: [
        BarChartRodData(
            toY: 10,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 4,
      barRods: [
        BarChartRodData(
            toY: 20,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 5,
      barRods: [
        BarChartRodData(
            toY: 12,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),

    BarChartGroupData(
      x: 6,
      barRods: [
        BarChartRodData(
            toY: 13,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 7, // August
      barRods: [
        BarChartRodData(
            toY: 18, // Set the desired value for August
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 8, // September
      barRods: [
        BarChartRodData(
            toY: 10, // Set the desired value for September
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 9, // September
      barRods: [
        BarChartRodData(
            toY: 8, // Set the desired value for September
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 10, // September
      barRods: [
        BarChartRodData(
            toY: 14, // Set the desired value for September
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 11, // September
      barRods: [
        BarChartRodData(
            toY: 12, // Set the desired value for September
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),



  ];
}


class BarChartYear extends StatelessWidget {
  const BarChartYear();

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        barTouchData: barTouchData,
        titlesData: titlesData,
        borderData: borderData,
        barGroups: barGroups,
        gridData:  FlGridData(show: false),
        alignment: BarChartAlignment.spaceAround,
        maxY: 30,
      ),
    );
  }

  BarTouchData get barTouchData => BarTouchData(
    enabled: false,
    touchTooltipData: BarTouchTooltipData(
      // getTooltipColor: (group) => Colors.transparent,
      tooltipPadding: EdgeInsets.all(0),
      tooltipMargin: 0,
      tooltipRoundedRadius: 12,
      tooltipBgColor: Colors.transparent,
      getTooltipItem: (
          BarChartGroupData group,
          int groupIndex,
          BarChartRodData rod,
          int rodIndex,
          ) {
        return BarTooltipItem(
          "${rod.toY.round().toString()}"+"M",
          const TextStyle(
            color:Colors.black,
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        );
      },
    ),
  );

  Widget getTitles(double value, TitleMeta meta) {
    final style = TextStyle(
      color: Colors.grey,
      fontWeight: FontWeight.bold,
      fontSize: 15,
    );
    String text;
    switch (value.toInt()) {
      case 0:
        text = '2020';
        break;
      case 1:
        text = '2021';
        break;
      case 2:
        text = '2022';
        break;
      case 3:
        text = '2023';
        break;
      case 4:
        text = '2023';
        break;
      default:
        text = '';
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 2,
      child: Text(text, style: style),
    );
  }

  FlTitlesData get titlesData => FlTitlesData(
    show: true,
    bottomTitles: AxisTitles(
      sideTitles: SideTitles(
        showTitles: true,
        reservedSize: 30,
        getTitlesWidget: getTitles,
      ),
    ),
    leftTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    topTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    rightTitles:  AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
  );

  FlBorderData get borderData => FlBorderData(
    show: false,
  );

  LinearGradient get _barsGradient => LinearGradient(
    colors: [
      Colors.green,
      Colors.cyan,
    ],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );

  List<BarChartGroupData> get barGroups => [
    BarChartGroupData(
      x: 0,
      barRods: [
        BarChartRodData(
            toY: 5,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 1,
      barRods: [
        BarChartRodData(
            toY: 10,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 2,
      barRods: [
        BarChartRodData(
            toY: 20,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 3,
      barRods: [
        BarChartRodData(
            toY: 10,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),
    BarChartGroupData(
      x: 4,
      barRods: [
        BarChartRodData(
            toY: 20,
            gradient: _barsGradient,
            width: 20,
            borderRadius: BorderRadius.all(Radius.zero)
        )
      ],
      showingTooltipIndicators: [0],
    ),

  ];
}


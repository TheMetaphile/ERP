// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:auto_size_text/auto_size_text.dart';
// import 'package:google_fonts/google_fonts.dart';
//
// class Timetable extends StatefulWidget {
//   const Timetable({super.key});
//
//   @override
//   State<Timetable> createState() => _TimetableState();
// }
//
// class _TimetableState extends State<Timetable> with TickerProviderStateMixin{
//   late TabController _tabController;
//   @override
//   void initState() {
//     super.initState();
//     _tabController = TabController(length: 6, vsync: this);
//     _tabController.addListener(_onTabChanged);
//   }
//
//   void _onTabChanged() {
//     setState(() {}); // Redraw the widget when tab changes
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     Size size=MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: Color(0xFF5A77BC),
//       appBar: AppBar(
//         leading: IconButton(
//           onPressed: (){
//             Navigator.pop(context);
//           },
//           icon: Icon(Icons.arrow_back_ios),
//         ),
//         iconTheme: IconThemeData(color: Colors.white),
//         backgroundColor: Colors.transparent,
//         title: Text("Classes",style: TextStyle(color: Colors.white,fontWeight: FontWeight.w400,fontSize: size.width*0.06),),
//       ),
//       body: Container(
//         child: Column(
//           children: [
//             SizedBox(
//               height:size.height*0.02
//             ),
//             Expanded(
//               child: Container(
//                   width:size.width,
//                   decoration:BoxDecoration(
//                       borderRadius: BorderRadius.only(topLeft: Radius.circular(size.width*0.08),topRight: Radius.circular(size.width*0.08)),
//                       color:Colors.white,
//                   ),
//                   child:Column(
//                     children: [
//                       SizedBox(
//                           height:size.height*0.078,
//                           width: size.width*0.95,
//                           child: TabBar(
//                             controller: _tabController,
//                             tabAlignment: TabAlignment.start,
//                             indicator: BoxDecoration(
//                               borderRadius: BorderRadius.circular(25),
//                               color: const Color.fromRGBO(103,135,214, 1),
//                             ),
//                             labelColor: Colors.white,
//                             unselectedLabelColor: const Color.fromRGBO(103,135,214, 1),
//                             indicatorSize: TabBarIndicatorSize.tab,
//                             isScrollable: true,
//                             tabs: [
//                               _buildTab('Mon', '18 Apr', context,size,1, _tabController),
//                               _buildTab('Tue', '19 Apr', context,size,2, _tabController),
//                               _buildTab('Wed', '20 Apr', context,size,3, _tabController),
//                               _buildTab('Thur', '21 Apr', context,size,4, _tabController),
//                               _buildTab('Fri', '22 Apr', context,size,5, _tabController),
//                               _buildTab('Sat', '23 Apr', context,size,6, _tabController),
//                             ],
//                           ),
//                       ),
//                       Expanded(
//                         child: TabBarView(
//                           controller: _tabController,
//                           children: [
//                             buildDayView('Mon', '17 Apr', context),
//                             buildDayView('Tue', '18 Apr', context),
//                             buildDayView('Wed', '19 Apr', context),
//                             buildDayView('Thur', '20 Apr', context),
//                             buildDayView('Fri', '21 Apr', context),
//                             buildDayView('Sat', '22 Apr', context),
//                           ],
//                         ),
//                       )
//                     ],
//                   )
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
//
//
// Widget _buildTab(String day, String date,BuildContext context,Size size,int index, TabController tabController) {
//   return Tab(
//
//     iconMargin: const EdgeInsets.all(8),
//
//     child: Column(
//       mainAxisAlignment: MainAxisAlignment.center,
//       children: [
//         AutoSizeText(day,
//           style:GoogleFonts.openSans(fontSize: 15,fontWeight:FontWeight.w600,)
//         ),
//         AutoSizeText(date,
//             style:GoogleFonts.openSans(fontSize:12,fontWeight:FontWeight.w500,)
//         ),
//       ],
//     ),
//   );
// }
//
// Widget buildDayView(String day,String date,context){
//   Size size=MediaQuery.of(context).size;
//   return SizedBox(
//     height:size.height*0.8,
//     width:size.width*0.95,
//     child: ListView(
//       children: [
//         buildSubjectInfo('Standard 12th', const TimeOfDay(hour: 08, minute: 15), 1, 'Computer Science', context),
//         SizedBox(
//             height:size.height*0.007
//         ),
//         buildSubjectInfo('Standard 11th', const TimeOfDay(hour: 09, minute: 00), 2, 'Mathematics', context),
//         SizedBox(
//             height:size.height*0.007
//         ),
//         buildSubjectInfo('Standard 10th', const TimeOfDay(hour: 09, minute: 45), 3, 'English', context),
//         SizedBox(
//             height:size.height*0.007
//         ),
//         buildSubjectInfo('', const TimeOfDay(hour: 10, minute: 30), 3, 'Lunch Break', context),
//         SizedBox(
//             height:size.height*0.007
//         ),
//         buildSubjectInfo('Standard 9th', const TimeOfDay(hour: 11, minute: 00), 4, 'Science', context),
//         SizedBox(
//             height:size.height*0.007
//         ),
//         buildSubjectInfo('Standard 8th', const TimeOfDay(hour: 11, minute: 45), 5, 'Social Study', context)
//       ],
//     ),
//   );
// }
//
// Widget buildSubjectInfo(String name,TimeOfDay fixedTime, int period,String subj,context){
//   int duration=(name!='')?45:30;
//   int minute=fixedTime.minute;
//   int hour=fixedTime.hour;
//   Size size=MediaQuery.of(context).size;
//   return (name!='')
//       ?
//   Card(
//     elevation:5,
//     shadowColor: Colors.black,
//     shape: RoundedRectangleBorder(
//         side: const BorderSide(width: 1),
//         borderRadius: BorderRadius.circular(size.width*0.03)
//     ),
//     child: SizedBox(
//       height:size.height*0.15,
//       child: Column(
//         children: [
//           ListTile(
//             onTap:(){},
//             title: AutoSizeText(subj,
//                 style:GoogleFonts.openSans(fontSize:20,fontWeight:FontWeight.w600)
//             ),
//             subtitle: AutoSizeText('${(hour<10)?'0$hour':hour}:${(minute==0)?'00':minute}-${((minute+duration)>=60)?(hour+1):hour}:${(minute+duration>=60)?(((minute+duration)==60)?'00':((minute+duration)%60)):(minute+duration)}${(hour>=12)?'pm':'am'}',
//                 style:GoogleFonts.openSans(fontSize:15,fontWeight:FontWeight.w500,color:Colors.black.withOpacity(0.5))
//             ),
//           ),
//           Divider(
//             indent: size.width*0.03,
//             endIndent: size.width*0.03,
//             thickness: size.width*0.003,
//           ),
//           SizedBox(
//               height:size.height*0.033,
//               child: Row(
//                 children: [
//                   SizedBox(
//                       width:size.width*0.03
//                   ),
//                   Expanded(
//
//                     child: Row(
//                       mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                       children: [
//                         AutoSizeText(name,
//                             style:GoogleFonts.openSans(fontSize:17,fontWeight:FontWeight.w600,color:Colors.black.withOpacity(0.5))
//                         ),
//                         AutoSizeText('Period $period',
//                             style:GoogleFonts.openSans(fontSize:16,fontWeight:FontWeight.w600,color:Colors.black)
//                         ),
//                       ],
//                     ),
//                   ),
//                   SizedBox(
//                       width:size.width*0.03
//                   ),
//                 ],
//               )
//           ),
//         ],
//       ),
//     ),
//   )
//       :
//   Card(
//     elevation:5,
//     shadowColor: Colors.black,
//     color: const Color.fromRGBO(103,135,214, 1),
//     shape: RoundedRectangleBorder(
//         side: const BorderSide(width: 1),
//         borderRadius: BorderRadius.circular(size.width*0.03)
//     ),
//     child: SizedBox(
//       height:size.height*0.09,
//       child: ListTile(
//         onTap:(){},
//         title: AutoSizeText(subj,
//             style:GoogleFonts.openSans(fontSize:18,fontWeight:FontWeight.w700,color: Colors.white)
//         ),
//         subtitle: AutoSizeText('$hour:$minute-${((minute+duration)>=60)?(hour+1):hour}:${(minute+duration>=60)?(((minute+duration)==60)?'00':((minute+duration)%60)):(minute+duration)}${(hour>=12)?'pm':'am'}',
//             style:GoogleFonts.openSans(fontSize:18,fontWeight:FontWeight.w600,color:Colors.white.withOpacity(0.5))
//         ),
//         trailing: CircleAvatar(
//           radius: size.height*0.035,
//             backgroundImage: const AssetImage("assets/Images/lunch.jpg")),
//       ),
//     ),
//   );
// }

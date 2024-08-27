import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shimmer/shimmer.dart';
import 'package:student/APIs/StudentModuleAPI/Ask_Doubts/ask_doubtAPI.dart';

import '../../APIs/StudentModuleAPI/StudentSubject/subjects.dart';
import '../../CustomTheme/customTheme.dart';

// class AskDoubts extends StatefulWidget {
//   const AskDoubts({super.key, required this.currentClass, required this.section});
//   final String currentClass;
//   final String section;
//
//   @override
//   State<AskDoubts> createState() => _AskDoubtsState();
// }
//
// class _AskDoubtsState extends State<AskDoubts> {
//   String selectedSubject="";
//   List<String>? subjectOptions;
//   List<String>  handleSubject=[
//     ""
//   ];
//   String status ="Pending";
//   List<String> statusOptions = [
//     'Pending',
//     'Resolved',
//     'Rejected',
//   ];
//   bool isLoading=false;
//
//   AskDoubtAPI doubtObj=AskDoubtAPI();
//
//   List<dynamic>? doubtList;
//
//   final ScrollController _scrollController = ScrollController();
//   bool isLoadingMore = false;
//   bool allDataLoaded = false;
//   int start=0;
//   final question = TextEditingController();
//
//   Future<void> fetchDoubts() async {
//     setState(() {
//       isLoading = true;
//       start = 0; // Reset start value
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       List<dynamic> fetchedLeaves = await doubtObj.fetchDoubts(accessToken!, status,selectedSubject,start);
//       print("fetched leaves $fetchedLeaves");
//
//       setState(() {
//         doubtList = fetchedLeaves;
//       });
//     } catch (e) {
//       print('Error fetching leave data: $e');
//       showRedSnackBar("Error occurred to fetch doubts $e", context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void> fetchMoreDoubts() async {
//     if (isLoadingMore || allDataLoaded) return;
//
//     setState(() {
//       isLoadingMore = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       int newStart = start + (doubtList?.length ?? 0);
//       List<dynamic> fetchedLeaves = await doubtObj.fetchDoubts(accessToken!,status,selectedSubject, newStart);
//       setState(() {
//         doubtList?.addAll(fetchedLeaves);
//         start = newStart; // Update the start variable
//       });
//     } catch (e) {
//       print('Error fetching more leave data: $e');
//       showRedSnackBar("Error occurred to load more leaves $e.", context);
//     } finally {
//       setState(() {
//         isLoadingMore = false;
//       });
//     }
//   }
//
//
//   Future<void> fetchSubjects() async {
//     SharedPreferences pref=await SharedPreferences.getInstance();
//     subjectOptions =pref.getStringList("subjects") ;
//   }
//
//
//   Future<dynamic> askDoubt(String subject,String question) async {
//
//
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       var doubtAsk = await doubtObj.askDoubts(accessToken!, question, subject);
//       print("doubtAsk $doubtAsk");
//
//       return doubtAsk;
//     } catch (e) {
//
//       showRedSnackBar("Error on askDoubt $e.", context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void>askDoubtPopup( BuildContext context ,Size size,CustomTheme themeObj,List<String> subjectOptions, String selectedSubject)async {
//
//     return showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return StatefulBuilder(
//           builder: (context, setState) {
//             return  Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Card(
//                   margin: const EdgeInsets.symmetric(horizontal: 10,),
//                   elevation: 3,
//                   child: Padding(
//                     padding: const EdgeInsets.all(8.0),
//                     child: SizedBox(
//                       width: size.width*0.9,
//                       child: Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           SizedBox(height: size.height*0.01,),
//                           Text("To Ask a doubt please select class and subject and write your Question? You can also attached photos for references.",textAlign: TextAlign.center,style: themeObj.normalText,),
//                           SizedBox(height: size.height*0.01,),
//                           Card(
//                             child: SizedBox(
//                               width: size.width,
//                               height: size.height * 0.05,
//                               child:DropdownButton<String>(
//                                 isExpanded: true,
//                                 borderRadius: BorderRadius.circular(12),
//                                 hint: Text("Subject", style: themeObj.normalText),
//                                 padding: EdgeInsets.all(8),
//                                 icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
//                                 alignment: Alignment.center,
//                                 underline: Container(),
//                                 value: selectedSubject.isEmpty ? null : selectedSubject,
//                                 onChanged: (newValue) {
//                                   setState(() {
//                                     selectedSubject = newValue!;
//                                   });
//                                 },
//                                 items:subjectOptions.map((String option) {
//                                   return DropdownMenuItem<String>(
//                                     value: option,
//                                     child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
//                                   );
//                                 }).toList(),
//                               ),
//
//
//                             ),
//                           ),
//                           SizedBox(height: size.height*0.03,),
//                           Text("Your Question",textAlign: TextAlign.center,style: themeObj.normalText),
//                           SizedBox(height: size.height*0.01,),
//                           TextField(
//                             maxLines: 5,
//                             decoration: InputDecoration(
//                                 border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
//                             ),
//                             controller: question,
//                           ),
//                           SizedBox(height: size.height*0.02,),
//                           Row(
//                             mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                             children: [
//                               SizedBox(
//                                 width: size.width*0.3,
//                                 child: ElevatedButton(
//                                     style: ElevatedButton.styleFrom(backgroundColor:const Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
//                                     onPressed: (){
//                                       Navigator.pop(context);
//                                     },
//                                     child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
//                               ),
//                               SizedBox(
//                                 width: size.width * 0.3,
//                                 child: ElevatedButton(
//                                   style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
//                                   onPressed: () async {
//                                     if (question.text.isNotEmpty) {
//                                       setState(() {
//                                         isLoading = true;
//                                       });
//                                       Map<dynamic, dynamic>? newDoubt=  await askDoubt(selectedSubject, question.text.toString());
//                                       setState(() {
//                                         isLoading = false;
//                                       });
//                                       if (newDoubt != null) {
//
//                                         doubtList?.insert(0, newDoubt);
//                                         print("added");
//                                         this.setState(() {});
//                                       }
//                                       Navigator.pop(context);
//                                     } else {
//                                       // Show an error message if any field is empty
//                                       showRedSnackBar("Please fill all fields", context);
//                                     }
//                                   },
//                                   child: isLoading
//                                       ? const CircularProgressIndicator(color: Colors.black)
//                                       : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
//                                 ),
//                               ),
//
//                             ],
//                           ),
//
//
//                         ],
//                       ),
//                     ),
//                   ),
//                 ),
//               ],
//             );
//           },);
//
//       },);
//
//   }
//
//   Future<void> updateAskDoubt(Map<String, dynamic> updateDoubt) async {
//
//     print("/////////$updateDoubt");
//
//     setState(() {
//       isLoading = true;
//     });
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       var success = await doubtObj.updateDoubt(accessToken!,updateDoubt["_id"],updateDoubt);
//       if(success==true){
//
//         setState(() {
//           // int index = teacherLeaves?.indexWhere((leave) => leave['_id'] == updatedLeave["_id"]) ?? -1;
//           // if (index != -1) {
//           //   // Update the leave in the teacherLeaves list
//           //   teacherLeaves?[index] = {
//           //     ...teacherLeaves![index], // Keep existing fields
//           //     ...updatedLeave, // Update with new fields
//           //   };
//           // }
//           fetchDoubts();
//
//           showGreenSnackBar("Doubt Updated Successfully", context);
//         });
//       }else{
//         showGreenSnackBar("Doubt Not updated", context);
//       }
//
//
//     } catch (e) {
//
//       showRedSnackBar("Error on Updating $e.", context);
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void>updateAskDoubtPopup( BuildContext context ,Size size,List<String> subjectOptions, String selectedSubject, Map<String, dynamic> doubtData,CustomTheme themeObj){
//     print("////////////////////////$doubtData");
//     TextEditingController question = TextEditingController(text: doubtData['question']);
//
//     return showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return StatefulBuilder(
//           builder: (context, setState) {
//             return  Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Card(
//                   margin: const EdgeInsets.symmetric(horizontal: 10,),
//                   elevation: 3,
//                   child: Padding(
//                     padding: const EdgeInsets.all(8.0),
//                     child: SizedBox(
//                       width: size.width*0.9,
//                       child: Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           SizedBox(height: size.height*0.01,),
//                           Text("To Ask a doubt please select class and subject and write your Question? You can also attached photos for references.",textAlign: TextAlign.center,style: themeObj.normalText,),
//                           SizedBox(height: size.height*0.01,),
//                           Card(
//                             child: SizedBox(
//                               width: size.width,
//                               height: size.height * 0.05,
//                               child:DropdownButton<String>(
//                                 isExpanded: true,
//                                 borderRadius: BorderRadius.circular(12),
//                                 hint: Text("Subject", style: themeObj.normalText),
//                                 padding: const EdgeInsets.all(8),
//                                 icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
//                                 alignment: Alignment.center,
//                                 underline: Container(),
//                                 value: selectedSubject.isEmpty ? null : selectedSubject,
//                                 onChanged: (newValue) {
//                                   setState(() {
//                                     selectedSubject = newValue!;
//                                   });
//                                 },
//                                 items:subjectOptions.map((String option) {
//                                   return DropdownMenuItem<String>(
//                                     value: option,
//                                     child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
//                                   );
//                                 }).toList(),
//                               ),
//
//
//                             ),
//                           ),
//                           SizedBox(height: size.height*0.03,),
//                           Text("Your Question",textAlign: TextAlign.center,style: themeObj.normalText),
//                           SizedBox(height: size.height*0.01,),
//                           TextField(
//                             maxLines: 5,
//                             decoration: InputDecoration(
//                                 border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
//                             ),
//                             controller: question,
//                           ),
//                           SizedBox(height: size.height*0.02,),
//                           Row(
//                             mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//                             children: [
//                               SizedBox(
//                                 width: size.width*0.3,
//                                 child: ElevatedButton(
//                                     style: ElevatedButton.styleFrom(backgroundColor:const Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
//                                     onPressed: (){
//                                       Navigator.pop(context);
//                                     },
//                                     child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
//                               ),
//                               SizedBox(
//                                 width: size.width * 0.3,
//                                 child: ElevatedButton(
//                                   style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
//                                   onPressed: () async {
//                                     if (question.text.isNotEmpty) {
//                                       setState(() {
//                                         isLoading = true;
//                                       });
//                                       Map<String, dynamic> updatedLeave = {
//                                         "_id": doubtData['_id'],
//                                        "subject":selectedSubject,
//                                         "question": question.text,
//                                       };
//                                       await updateAskDoubt( updatedLeave);
//                                       Navigator.of(context).pop();
//                                       setState(() {
//                                         isLoading = false;
//                                       });
//
//                                     } else {
//                                       showRedSnackBar("Please fill all fields", context);
//                                     }
//                                   },
//                                   child: isLoading
//                                       ? const CircularProgressIndicator(color: Colors.black)
//                                       : Text("Update", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
//                                 ),
//                               ),
//
//                             ],
//                           ),
//
//
//                         ],
//                       ),
//                     ),
//                   ),
//                 ),
//               ],
//             );
//           },);
//
//       },);
//
//   }
//
//   Future<void> deleteDoubt(String doubtID) async{
//
//     try {
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? accessToken = pref.getString("accessToken");
//
//       var success = await doubtObj.deleteDoubt(accessToken!, doubtID);
//       print("applyLeaveResponse $success");
//       if(success==true){
//         setState(() {
//           doubtList?.removeWhere((leave) => leave['_id'] == doubtID);
//           showGreenSnackBar("Doubt deleted Successfully", context);
//         });
//       }else{
//         showRedSnackBar("Failed to delete a Doubt", context);
//       }
//
//     } catch (e) {
//       print('Error delete a Doubt: $e');
//       showRedSnackBar("Error Doubt. $e", context);
//     }
//   }
//   @override
//   void initState() {
//     // TODO: implement initState
//     super.initState();
//     fetchSubjects();
//     fetchDoubts();
//     _scrollController.addListener(_scrollListener);
//   }
//   @override
//   void dispose() {
//     _scrollController.dispose();
//     super.dispose();
//   }
//   void _scrollListener() {
//     if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
//       fetchMoreDoubts();
//     }
//   }
//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;
//     CustomTheme themeObj=CustomTheme(size);
//     print(doubtList);
//     return Scaffold(
//         backgroundColor: CustomTheme.whiteColor,
//         appBar: AppBar(
//           iconTheme: IconThemeData(color: CustomTheme.blackColor,),
//           leading: IconButton(
//             onPressed: (){
//               Navigator.pop(context);
//             },
//             icon: const Icon(Icons.arrow_back_ios),
//           ),
//           backgroundColor:  CustomTheme.primaryColor,
//           title: Text("My Doubts",style: themeObj.bigNormalText),
//           actions: [
//             SizedBox(
//               width: size.width*0.35,
//               child: TextButton(onPressed: (){
//                 askDoubtPopup(context,size,themeObj,subjectOptions!,selectedSubject);
//               },
//                 style: TextButton.styleFrom(backgroundColor:const Color.fromRGBO(216,180,254,1)),
//                 child:Row(
//                   children: [
//                     Icon(CupertinoIcons.add_circled,color: CustomTheme.blackColor,),
//                     SizedBox(width: size.width*0.02,),
//                     Text("Ask Doubt",style: themeObj.bigNormalText.copyWith(fontSize: size.width*0.035),),
//
//
//                   ],
//                 ),),
//             )
//           ],
//         ),
//         body: SingleChildScrollView(
//           child: Center(
//             child: Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 8),
//               child: Container(
//                   color: CustomTheme.whiteColor,
//                   child: Column(
//                     children: [
//                       SizedBox(height: size.height * 0.02,),
//                       Row(
//                         mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                         children: [
//                           Text("Filter",style: themeObj.bigNormalText,),
//                           Card(
//                             child: SizedBox(
//                               width: size.width * 0.3,
//                               height: size.height * 0.05,
//                               child:DropdownButton<String>(
//                                 isExpanded: true,
//                                 borderRadius: BorderRadius.circular(12),
//                                 hint: Text("Subject", style: themeObj.normalText),
//                                 padding: const EdgeInsets.all(8),
//                                 icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
//                                 alignment: Alignment.center,
//                                 underline: Container(),
//                                 value: selectedSubject.isEmpty ? null : selectedSubject,
//                                 onChanged: (newValue) {
//                                   setState(() {
//                                     selectedSubject = newValue!;
//                                     doubtList=[];
//                                     fetchDoubts();
//
//
//
//                                   });
//                                 },
//                                 items: subjectOptions==null ||  subjectOptions!.isEmpty? handleSubject.map((String option) {
//                                   return DropdownMenuItem<String>(
//                                     value: option,
//                                     child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
//                                   );
//                                 }).toList():
//                                 subjectOptions?.map((String option) {
//                                   return DropdownMenuItem<String>(
//                                     value: option,
//                                     child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
//                                   );
//                                 }).toList(),
//                               ),
//
//
//                             ),
//                           ),
//                           Card(
//                             child:SizedBox(
//                               width: size.width * 0.3,
//                               height: size.height * 0.05,
//                               child: DropdownButton<String>(
//                                 isExpanded: true,
//                                 borderRadius: BorderRadius.circular(12),
//                                 padding: const EdgeInsets.all(8),
//                                 icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
//                                 alignment: Alignment.center,
//                                 underline: Container(),
//                                 value: status,
//                                 onChanged: (newValue) {
//                                   setState(() {
//                                     status = newValue!;
//                                     doubtList=[];
//                                     fetchDoubts();
//
//                                   });
//                                 },
//                                 items: statusOptions.map((String option) {
//                                   return DropdownMenuItem<String>(
//                                     value: option,
//                                     child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
//                                   );
//                                 }).toList(),
//                               ),
//                             ),
//                           ),
//                         ],
//                       ),
//                 doubtList == null || doubtList!.isEmpty ?
//                        Center(
//                       child: Text(
//                       "No Doubts found!",
//                       style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
//                       ),
//                       ):const SizedBox(),
//
//                       isLoading ?   Center(
//                         child: LoadingAnimationWidget.threeArchedCircle(
//                           color: CustomTheme.primaryColor,
//                           size: 50,
//                         ),
//                       ):
//                       ListView.builder(
//                         shrinkWrap: true,
//                         controller: _scrollController,
//                         itemCount: (doubtList?.length ?? 0) + (isLoadingMore ? 1 : 0),
//                         itemBuilder: (context, index) {
//                           if (doubtList!.isEmpty || doubtList == null) {
//                             return Center(
//                               child: Text(
//                                 "No Doubts found!",
//                                 style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
//                               ),
//                             );
//                           }
//                           if (index < (doubtList?.length ?? 0)) {
//                             final doubt = doubtList?[index];
//                             return Padding(
//                               padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
//                               child: Card(
//                                 elevation: 3,
//                                 margin: const EdgeInsets.all(0),
//                                 shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
//                                 child: ClipRRect(
//                                   borderRadius: BorderRadius.circular(15),
//                                   child: Column(
//                                     crossAxisAlignment: CrossAxisAlignment.start,
//                                     children: [
//                                       Container(
//                                         color: _getStatusColor(doubt['status']).withOpacity(0.1),
//                                         padding: const EdgeInsets.all(12),
//                                         child: Row(
//                                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                                           children: [
//                                             Text(
//                                               doubt['subject'],
//                                               style: themeObj.normalText.copyWith(fontWeight: FontWeight.bold),
//                                             ),
//                                             Container(
//                                               padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
//                                               decoration: BoxDecoration(
//                                                 color: _getStatusColor(doubt['status']),
//                                                 borderRadius: BorderRadius.circular(12),
//                                               ),
//                                               child: Text(
//                                                 doubt['status'],
//                                                 style: const TextStyle(color: Colors.white, fontSize: 12),
//                                               ),
//                                             ),
//                                           ],
//                                         ),
//                                       ),
//                                       Padding(
//                                         padding: const EdgeInsets.only(left: 12, top: 5),
//                                         child: Column(
//                                           crossAxisAlignment: CrossAxisAlignment.start,
//                                           children: [
//                                             Text(
//                                               "Question:",
//                                               style: themeObj.normalText.copyWith(fontWeight: FontWeight.bold),
//                                             ),
//                                             const SizedBox(height: 4),
//                                             Text(
//                                               doubt['question'],
//                                               style: themeObj.normalText,
//                                             ),
//                                             const SizedBox(height: 8),
//                                             Text(
//                                               "Date: ${doubt['date']}",
//                                               style: themeObj.normalText.copyWith(color: Colors.grey),
//                                             ),
//                                           ],
//                                         ),
//                                       ),
//                                       if (doubt['status'] == 'Pending')
//                                         Padding(
//                                           padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
//                                           child:   Row(
//                                             mainAxisAlignment: MainAxisAlignment.end,
//                                             children: [
//                                               _buildActionButton(
//                                                 icon: Icons.edit,
//                                                 color: Colors.blue,
//                                                 onPressed: () {
//                                                   updateAskDoubtPopup(context, size, subjectOptions!, selectedSubject, doubt, themeObj);
//                                                 },
//                                               ),
//                                               const SizedBox(width: 8),
//                                               _buildActionButton(
//                                                 icon: Icons.delete,
//                                                 color: Colors.red,
//                                                 onPressed: () {
//                                                   deleteDoubt(doubt["_id"]);
//                                                 },
//                                               ),
//                                             ],
//                                           ),
//                                         ),
//                                       if (doubt['status'] == 'Resolved')
//                                         ExpansionTile(
//                                           title: Text(
//                                             "View Solution",
//                                             style: themeObj.normalText.copyWith(fontWeight: FontWeight.bold),
//                                           ),
//                                           children: [
//                                             Padding(
//                                               padding: const EdgeInsets.only(top: 5, left: 12),
//                                               child: Column(
//                                                 crossAxisAlignment: CrossAxisAlignment.start,
//                                                 children: [
//                                                   Text(
//                                                     doubt['solution'],
//                                                     style: themeObj.normalText,
//                                                   ),
//                                                   const SizedBox(height: 8),
//                                                   Text(
//                                                     "Replied on: ${doubt['replyDate']}",
//                                                     style: themeObj.normalText.copyWith(color: Colors.grey),
//                                                   ),
//                                                   const SizedBox(height: 8),
//                                                   if (doubt['teacher'].isNotEmpty)
//                                                     Column(
//                                                       children: [
//                                                         Row(
//                                                           children: [
//                                                             CircleAvatar(
//                                                               backgroundImage: NetworkImage(doubt['teacher'][0]['profileLink']),
//                                                               radius: 20,
//                                                             ),
//                                                             const SizedBox(width: 8),
//                                                             Text(
//                                                               "Answered by: ${doubt['teacher'][0]['name']}",
//                                                               style: themeObj.normalText,
//                                                             ),
//                                                           ],
//                                                         ),
//                                                         SizedBox(height: size.height*0.008,)
//                                                       ],
//                                                     )
//                                                 ],
//                                               ),
//                                             ),
//                                           ],
//                                         ),
//                                       if (doubt['imageUrl'] != null && doubt['imageUrl'].isNotEmpty)
//                                         Padding(
//                                           padding: const EdgeInsets.all(12),
//                                           child: Image.network(
//                                             doubt['imageUrl'],
//                                             fit: BoxFit.cover,
//                                             width: double.infinity,
//                                             height: 200,
//                                           ),
//                                         ),
//                                     ],
//                                   ),
//                                 ),
//                               ),
//                             );
//                           } else {
//                             return Center(
//                               child: LoadingAnimationWidget.threeArchedCircle(
//                                 color: CustomTheme.primaryColor,
//                                 size: 50,
//                               ),
//                             );
//                           }
//                         },
//                       )
//
//                     ],
//                   )
//               ),
//             ),
//           ),
//         )
//     );
//   }
//   Widget _buildActionButton({required IconData icon, required Color color, required VoidCallback onPressed}) {
//     return Material(
//       color: color,
//       borderRadius: BorderRadius.circular(8),
//       child: InkWell(
//         onTap: onPressed,
//         borderRadius: BorderRadius.circular(8),
//         child: Padding(
//           padding: const EdgeInsets.all(8),
//           child: Icon(icon, color: Colors.white, size: 20),
//         ),
//       ),
//     );
//   }
//
//   Color _getStatusColor(String status) {
//     switch (status) {
//       case 'Pending':
//         return Colors.orange;
//       case 'Resolved':
//         return Colors.green;
//       case 'Rejected':
//         return Colors.red;
//       default:
//         return Colors.grey;
//     }
//
//   }
// }

class AskDoubts extends StatefulWidget {
  const AskDoubts({super.key, required this.currentClass, required this.section});
  final String currentClass;
  final String section;

  @override
  State<AskDoubts> createState() => _AskDoubtsState();
}

class _AskDoubtsState extends State<AskDoubts> with SingleTickerProviderStateMixin {
  String selectedSubject="";
  List<String>? subjectOptions;
  List<String>  handleSubject=[
    ""
  ];
  String status ="Pending";
  List<String> statusOptions = [
    'Pending',
    'Resolved',
    'Rejected',
  ];
  bool isLoading=false;

  AskDoubtAPI doubtObj=AskDoubtAPI();

  List<dynamic>? doubtList;

  final ScrollController _scrollController = ScrollController();
  bool isLoadingMore = false;
  bool allDataLoaded = false;
  int start=0;
  final question = TextEditingController();

  Future<void> fetchDoubts() async {
    setState(() {
      isLoading = true;
      start = 0; // Reset start value
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      List<dynamic> fetchedDoubts  = await doubtObj.fetchDoubts(accessToken!, status,selectedSubject,start);
      print("fetched leaves $fetchedDoubts ");

      setState(() {
        doubtList = fetchedDoubts ;
      });
    } catch (e) {
      print('Error fetching leave data: $e');
      showRedSnackBar("Error occurred to fetch doubts $e", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreDoubts() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      int newStart = start + (doubtList?.length ?? 0);
      List<dynamic> fetchedDoubts = await doubtObj.fetchDoubts(accessToken!,status,selectedSubject, newStart);
      int? previousLength=doubtList?.length;

      doubtList?.addAll(fetchedDoubts);

      int? newLength=doubtList?.length;
      if(newLength==previousLength && newLength!=null && previousLength!=null){
        allDataLoaded=true;
      }
    } catch (e) {
      print('Error fetching more leave data: $e');
      showRedSnackBar("Error occurred to load more leaves $e.", context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }


  Future<void> fetchSubjects() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
    subjectOptions =pref.getStringList("subjects") ;
  }


  Future<dynamic> askDoubt(String subject,String question) async {


    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var doubtAsk = await doubtObj.askDoubts(accessToken!, question, subject);
      print("doubtAsk $doubtAsk");

      return doubtAsk;
    } catch (e) {

      showRedSnackBar("Error on askDoubt $e.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void>askDoubtPopup( BuildContext context ,Size size,CustomTheme themeObj,List<String> subjectOptions, String selectedSubject)async {

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return  Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10,),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: SizedBox(
                      width: size.width*0.9,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: size.height*0.01,),
                          Text("To Ask a doubt please select class and subject and write your Question? You can also attached photos for references.",textAlign: TextAlign.center,style: themeObj.normalText,),
                          SizedBox(height: size.height*0.01,),
                          Card(
                            child: SizedBox(
                              width: size.width,
                              height: size.height * 0.05,
                              child:DropdownButton<String>(
                                isExpanded: true,
                                borderRadius: BorderRadius.circular(12),
                                hint: Text("Subject", style: themeObj.normalText),
                                padding: EdgeInsets.all(8),
                                icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
                                alignment: Alignment.center,
                                underline: Container(),
                                value: selectedSubject.isEmpty ? null : selectedSubject,
                                onChanged: (newValue) {
                                  setState(() {
                                    selectedSubject = newValue!;
                                  });
                                },
                                items:subjectOptions.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
                                  );
                                }).toList(),
                              ),


                            ),
                          ),
                          SizedBox(height: size.height*0.03,),
                          Text("Your Question",textAlign: TextAlign.center,style: themeObj.normalText),
                          SizedBox(height: size.height*0.01,),
                          TextField(
                            maxLines: 5,
                            decoration: InputDecoration(
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
                            ),
                            controller: question,
                          ),
                          SizedBox(height: size.height*0.02,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              SizedBox(
                                width: size.width*0.3,
                                child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(backgroundColor:const Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                    onPressed: (){
                                      Navigator.pop(context);
                                    },
                                    child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                              ),
                              SizedBox(
                                width: size.width * 0.3,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                  onPressed: () async {
                                    if (question.text.isNotEmpty) {
                                      setState(() {
                                        isLoading = true;
                                      });
                                      Map<dynamic, dynamic>? newDoubt=  await askDoubt(selectedSubject, question.text.toString());
                                      setState(() {
                                        isLoading = false;
                                      });
                                      if (newDoubt != null) {

                                        doubtList?.insert(0, newDoubt);
                                        print("added");
                                        this.setState(() {});
                                      }
                                      Navigator.pop(context);
                                    } else {
                                      // Show an error message if any field is empty
                                      showRedSnackBar("Please fill all fields", context);
                                    }
                                  },
                                  child: isLoading
                                      ? const CircularProgressIndicator(color: Colors.black)
                                      : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
                                ),
                              ),

                            ],
                          ),


                        ],
                      ),
                    ),
                  ),
                ),
              ],
            );
          },);

      },);

  }

  Future<void> updateAskDoubt(Map<String, dynamic> updateDoubt,int index) async {

    print("/////////$updateDoubt");

    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var success = await doubtObj.updateDoubt(accessToken!,updateDoubt["_id"],updateDoubt,widget.currentClass);
      if(success==true){

        setState(() {
          // int index = teacherLeaves?.indexWhere((leave) => leave['_id'] == updatedLeave["_id"]) ?? -1;
          // if (index != -1) {
          //   // Update the leave in the teacherLeaves list
          //   teacherLeaves?[index] = {
          //     ...teacherLeaves![index], // Keep existing fields
          //     ...updatedLeave, // Update with new fields
          //   };
          // }
          print("index $index");
          print("question ${updateDoubt["question"]}");
          print("subject ${updateDoubt["subject"]}");
          if (doubtList != null && doubtList!.length > index) {
            doubtList![index]["question"] = updateDoubt["question"] ?? doubtList![index]["question"];
            doubtList![index]["subject"] = updateDoubt["subject"] ?? doubtList![index]["subject"];
          }
          // fetchDoubts();

          showGreenSnackBar("Doubt Updated Successfully", context);
        });
      }else{
        showGreenSnackBar("Doubt Not updated", context);
      }


    } catch (e) {

      showRedSnackBar("Error on Updating $e.", context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void>updateAskDoubtPopup( BuildContext context ,Size size,List<String> subjectOptions, String selectedSubject, Map<String, dynamic> doubtData,CustomTheme themeObj,int index){
    print("////////////////////////$doubtData");
    TextEditingController question = TextEditingController(text: doubtData['question']);

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return  Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10,),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: SizedBox(
                      width: size.width*0.9,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: size.height*0.01,),
                          Text("To Ask a doubt please select class and subject and write your Question? You can also attached photos for references.",textAlign: TextAlign.center,style: themeObj.normalText,),
                          SizedBox(height: size.height*0.01,),
                          Card(
                            child: SizedBox(
                              width: size.width,
                              height: size.height * 0.05,
                              child:DropdownButton<String>(
                                isExpanded: true,
                                borderRadius: BorderRadius.circular(12),
                                hint: Text("Subject", style: themeObj.normalText),
                                padding: const EdgeInsets.all(8),
                                icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
                                alignment: Alignment.center,
                                underline: Container(),
                                value: selectedSubject.isEmpty ? null : selectedSubject,
                                onChanged: (newValue) {
                                  setState(() {
                                    selectedSubject = newValue!;
                                  });
                                },
                                items:subjectOptions.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
                                  );
                                }).toList(),
                              ),


                            ),
                          ),
                          SizedBox(height: size.height*0.03,),
                          Text("Your Question",textAlign: TextAlign.center,style: themeObj.normalText),
                          SizedBox(height: size.height*0.01,),
                          TextField(
                            maxLines: 5,
                            decoration: InputDecoration(
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12),)
                            ),
                            controller: question,
                          ),
                          SizedBox(height: size.height*0.02,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              SizedBox(
                                width: size.width*0.3,
                                child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(backgroundColor:const Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                    onPressed: (){
                                      Navigator.pop(context);
                                    },
                                    child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                              ),
                              SizedBox(
                                width: size.width * 0.3,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: const BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                  onPressed: () async {
                                    if (question.text.isNotEmpty) {
                                      setState(() {
                                        isLoading = true;
                                      });
                                      Map<String, dynamic> updatedLeave = {
                                        "_id": doubtData['_id'],
                                       "subject":selectedSubject,
                                        "question": question.text,
                                      };
                                      await updateAskDoubt( updatedLeave,index);
                                      Navigator.of(context).pop();
                                      setState(() {
                                        isLoading = false;
                                      });

                                    } else {
                                      showRedSnackBar("Please fill all fields", context);
                                    }
                                  },
                                  child: isLoading
                                      ? const CircularProgressIndicator(color: Colors.black)
                                      : Text("Update", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
                                ),
                              ),

                            ],
                          ),


                        ],
                      ),
                    ),
                  ),
                ),
              ],
            );
          },);

      },);

  }

  Future<void> deleteDoubt(String doubtID) async{

    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      var success = await doubtObj.deleteDoubt(accessToken!, doubtID,widget.currentClass);
      print("applyLeaveResponse $success");
      if(success==true){
        setState(() {
          doubtList?.removeWhere((leave) => leave['_id'] == doubtID);
          showGreenSnackBar("Doubt deleted Successfully", context);
        });
      }else{
        showRedSnackBar("Failed to delete a Doubt", context);
      }

    } catch (e) {
      print('Error delete a Doubt: $e');
      showRedSnackBar("Error Doubt. $e", context);
    }
  }

  late AnimationController _animationController;
  late Animation<double> _animation;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchSubjects();
    fetchDoubts();
    _scrollController.addListener(_scrollListener);


    _animationController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
  }
  @override
  void dispose() {
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }
  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
    if(!allDataLoaded) {
      fetchMoreDoubts();
    }
    }
  }
  @override
  Widget build(BuildContext context) {
    print("doubtList $doubtList");
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    print("Building main widget. doubtList length: ${doubtList?.length}");

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: _buildAppBar(size, themeObj),
      body: RefreshIndicator(
        onRefresh: () async {
          await fetchDoubts();
        },
        child: SingleChildScrollView(

          physics: const AlwaysScrollableScrollPhysics(),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: size.height * 0.01),
                _buildFilters(size, themeObj),
                SizedBox(height: size.height * 0.02),
                _buildDoubtsList(size, themeObj),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: _buildFloatingActionButton(size, themeObj),
    );
  }
  AppBar _buildAppBar(Size size, CustomTheme themeObj) {
    Size size = MediaQuery.of(context).size;
    return AppBar(
      elevation: 0,
      backgroundColor: CustomTheme.primaryColor,
      title: Text(
        "My Doubts",
        style: GoogleFonts.poppins(
          fontSize: size.width*0.045,
          fontWeight: FontWeight.w500,
          color: CustomTheme.blackColor,
        ),
      ),
      leading: IconButton(
        icon:  Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        onPressed: () => Navigator.pop(context),
      ),
      // actions: [
      //   IconButton(
      //     icon:  Icon(Icons.search, color: CustomTheme.blackColor),
      //     onPressed: () {
      //       // Implement search functionality
      //     },
      //   ),
      // ],
    );
  }

  Widget _buildActionButton({required IconData icon, required Color color, required VoidCallback onPressed}) {
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(8),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Icon(icon, color: Colors.white, size: 20),
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Pending':
        return Colors.orange;
      case 'Resolved':
        return Colors.green;
      case 'Rejected':
        return Colors.red;
      default:
        return Colors.grey;
    }

  }
  Widget _buildFilters(Size size, CustomTheme themeObj) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CustomTheme.primaryColor.withOpacity(0.1),
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(30),
          bottomRight: Radius.circular(30),
        ),
      ),
      child:  Row(
        children: [
          Expanded(
            child: _buildDropdown(
              hint: "Subject",
              value: selectedSubject.isEmpty ? null : selectedSubject,
              items: subjectOptions ?? handleSubject,
              onChanged: (newValue) {
                setState(() {
                  selectedSubject = newValue!;
                  doubtList = [];
                  fetchDoubts();
                });
              },
            ),
          ),
          SizedBox(width: size.width * 0.03),
          Expanded(
            child: _buildDropdown(
              hint: "Status",
              value: status,
              items: statusOptions,
              onChanged: (newValue) {
                setState(() {
                  status = newValue!;
                  doubtList = [];
                  fetchDoubts();
                });
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown({
    required String hint,
    required String? value,
    required List<String> items,
    required void Function(String?) onChanged,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          isExpanded: true,
          hint: Text(hint, style: GoogleFonts.poppins(fontSize: 14)),
          value: value,
          icon: const Icon(Icons.arrow_drop_down),
          iconSize: 24,
          elevation: 16,
          style: GoogleFonts.poppins(color: Colors.black87, fontSize: 14),
          onChanged: onChanged,
          items: items.map<DropdownMenuItem<String>>((String item) {
            return DropdownMenuItem<String>(
              value: item,
              child: Text(item, style: GoogleFonts.poppins(fontSize: 14)),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildDoubtsList(Size size, CustomTheme themeObj) {
    if (isLoading) {
      return _buildShimmerEffect(size);
    }

    if (doubtList == null || doubtList!.isEmpty) {
      return Center(
        child: Text(
          "No Doubts found!",
          style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
        ),
      );
    }

    return AnimationLimiter(
      child: ListView.builder(
        itemCount: doubtList!.length + (isLoadingMore ? 1 : 0),
        controller: _scrollController,
        padding: EdgeInsets.all(5),
        shrinkWrap: true,
        itemBuilder: (context, index) {
          return AnimationConfiguration.staggeredList(
            position: index,
            duration: const Duration(milliseconds: 375),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: _buildDoubtCard(doubtList![index], size, themeObj, index),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildShimmerEffect(Size size) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: 5,
        itemBuilder: (_, __) => Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                height: 24,
                color: Colors.white,
              ),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                height: 80,
                color: Colors.white,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDoubtCard(Map<String, dynamic> doubt, Size size, CustomTheme themeObj,int index) {
    return Card(
      elevation: 3,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              color: _getStatusColor(doubt['status']).withOpacity(0.1),
              padding: const EdgeInsets.all(12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    doubt['subject'],
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.w500,
                      fontSize: size.width*0.045,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: _getStatusColor(doubt['status']),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      doubt['status'],
                      style: GoogleFonts.poppins(color: Colors.white,     fontSize: size.width*0.035,),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Question:",
                    style: GoogleFonts.poppins(fontWeight: FontWeight.w500, fontSize: size.width*0.035,),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    doubt['question'],
                    style: GoogleFonts.poppins(fontSize:  size.width*0.04),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "Date: ${doubt['date']}",
                    style: GoogleFonts.poppins(color: Colors.grey, fontSize:   size.width*0.035),
                  ),
                ],
              ),
            ),
            if (doubt['status'] == 'Pending')
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    _buildActionButton(
                      icon: Icons.edit,
                      color: Colors.blue,
                      onPressed: () {
                        updateAskDoubtPopup(context, size, subjectOptions!, selectedSubject, doubt, themeObj,index);
                      },
                    ),
                    const SizedBox(width: 8),
                    _buildActionButton(
                      icon: Icons.delete,
                      color: Colors.red,
                      onPressed: () {
                        deleteDoubt(doubt["_id"]);
                      },
                    ),
                  ],
                ),
              ),
            if (doubt['status'] == 'Resolved')
              _buildSolutionExpansionTile(doubt, themeObj, size),
            if (doubt['imageUrl'] != null && doubt['imageUrl'].isNotEmpty)
              Padding(
                padding: const EdgeInsets.all(12),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.network(
                    doubt['imageUrl'],
                    fit: BoxFit.cover,
                    width: double.infinity,
                    height: 200,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildSolutionExpansionTile(Map<String, dynamic> doubt, CustomTheme themeObj,Size size) {
    return Theme(
      data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
      child: ExpansionTile(
        title: Text(
          "View Solution",
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600, fontSize: size.width*0.04),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  doubt['solution'],
                  style: GoogleFonts.poppins(fontSize: size.width*0.035),
                ),
                const SizedBox(height: 8),
                Text(
                  "Replied on: ${doubt['replyDate']}",
                  style: GoogleFonts.poppins(color: Colors.grey, fontSize: size.width*0.035),
                ),
                const SizedBox(height: 8),
                if (doubt['teacher'].isNotEmpty)
                  Row(
                    children: [
                      CircleAvatar(
                        backgroundImage: NetworkImage(doubt['teacher'][0]['profileLink']),
                        radius: size.width*0.045,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          "Answered by: ${doubt['teacher'][0]['name']}",
                          style: GoogleFonts.poppins(fontSize: 14),
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFloatingActionButton(Size size, CustomTheme themeObj) {
    return FloatingActionButton.extended(
      onPressed: () {
        askDoubtPopup(context, size, themeObj, subjectOptions!, selectedSubject);
      },
      backgroundColor: CustomTheme.primaryColor,
      icon: const Icon(CupertinoIcons.add_circled, color: Colors.white),
      label: Text(
        "Ask Doubt",
        style: GoogleFonts.poppins(color: Colors.white, fontWeight: FontWeight.w600),
      ),
    );
  }

}



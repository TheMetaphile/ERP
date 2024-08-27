import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/NoteBookReord/noteBookRecordAPI.dart';
import 'package:untitled/utils/theme.dart';
import 'package:untitled/utils/utils.dart';

// class PreviousNoteBookRecord extends StatefulWidget {
//   const PreviousNoteBookRecord({super.key, required this.docId, required this.chapter, required this.topic, required this.date, required this.session});
//   final String docId;
//   final String chapter;
//   final String topic;
//   final String date;
//   final String session;
//
//   @override
//   State<PreviousNoteBookRecord> createState() => _PreviousNoteBookRecordState();
// }
//
// class _PreviousNoteBookRecordState extends State<PreviousNoteBookRecord> {
//   List<Map<String, dynamic>>? pendingStudentList;
//   List<Map<String, dynamic>>? checkedStudentList;
//   List<String> checkedList =[];
//
//   CustomTheme themeObj=CustomTheme();
//   String selectedFilter = 'Pending';
//   bool isLoading=false;
//
//
//   NoteBookRecordAPI apiObj=NoteBookRecordAPI();
//
//   Future<void> getPreviousRecord() async {
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
//       Map<String, dynamic> data =await apiObj.previousRecord(accessToken, widget.docId, widget.session);
//
//
//        List<dynamic> submittedBy=data["submittedBy"] ;
//
//
//       List<dynamic> notSubmittedBy=data["notSubmittedby"];
//
//       setState(() {
//        pendingStudentList=(notSubmittedBy).cast<Map<String, dynamic>>();
//        checkedStudentList=(submittedBy).cast<Map<String, dynamic>>();
//       });
//     } catch (e) {
//       print('Error fetching classWorkList data: $e');
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text('Failed to load classWorkList. Please try again.')),
//       );
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   Future<void> updatePreviousRecord() async {
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
//       dynamic data =await apiObj.updateNoteBookRecord(accessToken,widget.docId,widget.session,checkedList);
//
//       if(data==true){
//
//         setState(() {
//           showGreenSnackBar("NoteBookRecord Updated Successfully", context);
//           checkedList=[];
//           getPreviousRecord();
//         });
//       }else if(data==false){
//         showRedSnackBar("Failed to Update a NoteBookRecord", context);
//       }
//     } catch (e) {
//       showRedSnackBar("$e", context);
//       print('Error fetching update data: $e');
//
//     } finally {
//       setState(() {
//         isLoading = false;
//       });
//     }
//   }
//
//   @override
//   void initState() {
//     // TODO: implement initState
//     super.initState();
//     getPreviousRecord();
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     // print(widget.docId);
//     // print(widget.chapter);
//     // print(widget.topic);
//     // print(widget.date);
//     // print(pendingStudentList);
//     // print("checkedStudentList $checkedStudentList");
//     Size size = MediaQuery.of(context).size;
//     return Scaffold(
//       backgroundColor: themeObj.textWhite,
//       appBar: AppBar(
//         leading: IconButton(
//           onPressed: () => Navigator.pop(context),
//           icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
//         ),
//         backgroundColor: themeObj.primayColor,
//         title: Text(
//           "Record",
//           style: GoogleFonts.openSans(
//             color: themeObj.textBlack,
//             fontWeight: FontWeight.w500,
//             fontSize: size.width * 0.05,
//           ),
//         ),
//       ),
//       body: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Padding(
//           padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               SizedBox(height: size.height * 0.02),
//               _buildFilterButtons(size),
//               SizedBox(height: size.height * 0.01),
//               isLoading? Center(
//                 child: LoadingAnimationWidget.threeArchedCircle(
//                   color: themeObj.primayColor,
//                   size: 50,
//                 ),
//               ):
//               pendingTable(),
//
//             ],
//           ),
//         ),
//       ),
//       floatingActionButton: selectedFilter=="Pending"?SizedBox(
//           width: size.width*0.3,
//
//           child: TextButton(
//             onPressed: (){
//
//               updatePreviousRecord();
//             },
//             style: TextButton.styleFrom(backgroundColor: Color.fromRGBO(216,180,254,1)),
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 Text("Update",style: GoogleFonts.openSans(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.045),),
//               ],
//             ),
//           ),
//         ):SizedBox(),
//           );
//
//   }
//   Widget _buildFilterButtons(Size size) {
//     return Row(
//       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//       children: ['Pending', 'Checked'].map((filter) {
//         return Padding(
//           padding: EdgeInsets.only(right: size.width * 0.02),
//           child: ElevatedButton(
//             onPressed: () {
//               setState((){
//                 selectedFilter = filter;
//               });
//
//             },
//
//             style: ElevatedButton.styleFrom(
//               backgroundColor: selectedFilter == filter
//                   ? themeObj.primayColor
//                   : Color.fromRGBO(209, 213, 219, 1),
//               shape: RoundedRectangleBorder(
//                 borderRadius: BorderRadius.circular(8),
//
//               ),
//             ),
//             child: Text(
//               filter,
//               style: GoogleFonts.openSans(
//                 color: themeObj.textBlack,
//                 fontWeight: FontWeight.w400,
//                 fontSize: size.width * 0.035,
//               ),
//             ),
//           ),
//         );
//       }).toList(),
//     );
//   }
//
//   Widget pendingTable() {
//     return SingleChildScrollView(
//       scrollDirection: Axis.horizontal,
//       child: SingleChildScrollView(
//         scrollDirection: Axis.vertical,
//         child: Table(
//           border: TableBorder.all(),
//           columnWidths: {
//             0: FixedColumnWidth(80),
//             1: FixedColumnWidth(150),
//             2: FixedColumnWidth(120),
//             3: FixedColumnWidth(120),
//             4: FixedColumnWidth(120),
//             5: FixedColumnWidth(150),
//           },
//           children: [
//             pendingHeader(),
//             ...pendingRows(),
//           ],
//         ),
//       ),
//     );
//   }
//
//   TableRow pendingHeader() {
//     return TableRow(
//       decoration: BoxDecoration(color: Colors.cyan[100]),
//       children: [
//         'Roll No.',
//         'Name',
//         'Date',
//         'Chapter',
//         'Topic',
//         'Notebook Checked'
//       ].map((header) => TableCell(
//         child: Padding(
//           padding: EdgeInsets.all(8),
//           child: Text(
//               header,
//               style: TextStyle(fontWeight: FontWeight.bold)
//           ),
//         ),
//       )).toList(),
//     );
//   }
//
//   List<TableRow> pendingRows() {
//     if(selectedFilter=="Pending") {
//       return pendingStudentList!.map((student) {
//         return TableRow(
//           children: [
//             pendingTableCell(student["rollNumber"]?.toString() ?? ""),
//             pendingTableCell(student['name']?.toString() ?? ""),
//             pendingTableCell(widget.date),
//             pendingTableCell(widget.chapter),
//             pendingTableCell(widget.topic),
//             newCheckboxCell(student['email']?.toString() ?? ""),
//           ],
//         );
//       }).toList();
//     }else{
//       return checkedStudentList!.map((student) {
//         return TableRow(
//           children: [
//             pendingTableCell(student["rollNumber"]?.toString() ?? ""),
//             pendingTableCell(student['name']?.toString() ?? ""),
//             pendingTableCell(widget.date),
//             pendingTableCell(widget.chapter),
//             pendingTableCell(widget.topic),
//             newCheckboxCell(student['email']?.toString() ?? ""),
//           ],
//         );
//       }).toList();
//     }
//   }
//
//   Widget pendingTableCell(String text) {
//     return TableCell(
//       child: Padding(
//         padding: EdgeInsets.all(8),
//         child: Text(text),
//       ),
//     );
//   }
//
//   Widget newCheckboxCell(String email) {
//     return TableCell(
//       child: Padding(
//         padding: EdgeInsets.all(8),
//         child: selectedFilter=="Pending"? Switch(
//           value: checkedList.contains(email),
//           activeColor: Colors.green,
//           inactiveTrackColor: Colors.red[100],
//
//
//           onChanged: (bool value) {
//             setState(() {
//               if (value) {
//                 checkedList.add(email);
//               } else {
//                 checkedList.remove(email);
//               }
//               print(checkedList);
//             });
//           },
//         ):
//         Switch(
//             value: true,
//             activeColor: Colors.green,
//             onChanged: (bool value){}
//
//         ),
//       ),
//     );
//   }
// }

class PreviousNoteBookRecord extends StatefulWidget {
  const PreviousNoteBookRecord({super.key, required this.docId, required this.chapter, required this.topic, required this.date, required this.session});
  final String docId;
  final String chapter;
  final String topic;
  final String date;
  final String session;

  @override
  State<PreviousNoteBookRecord> createState() => _PreviousNoteBookRecordState();
}

class _PreviousNoteBookRecordState extends State<PreviousNoteBookRecord>with SingleTickerProviderStateMixin  {
  List<Map<String, dynamic>>? pendingStudentList;
  List<Map<String, dynamic>>? checkedStudentList;
  List<String> checkedList =[];

  CustomTheme themeObj=CustomTheme();
  String selectedFilter = 'Pending';
  bool isLoading=false;


  NoteBookRecordAPI apiObj=NoteBookRecordAPI();

  Future<void> getPreviousRecord() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      Map<String, dynamic> data =await apiObj.previousRecord(accessToken, widget.docId, widget.session);


       List<dynamic> submittedBy=data["submittedBy"] ;


      List<dynamic> notSubmittedBy=data["notSubmittedby"];

      setState(() {
       pendingStudentList=(notSubmittedBy).cast<Map<String, dynamic>>();
       checkedStudentList=(submittedBy).cast<Map<String, dynamic>>();
      });
    } catch (e) {
      print('Error fetching classWorkList data: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load classWorkList. Please try again.')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> updatePreviousRecord() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      dynamic data =await apiObj.updateNoteBookRecord(accessToken,widget.docId,widget.session,checkedList);

      if(data==true){

        setState(() {
          showGreenSnackBar("NoteBookRecord Updated Successfully", context);
          checkedList=[];
          getPreviousRecord();
        });
      }else if(data==false){
        showRedSnackBar("Failed to Update a NoteBookRecord", context);
      }
    } catch (e) {
      showRedSnackBar("$e", context);
      print('Error fetching update data: $e');

    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    getPreviousRecord();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _animation = CurvedAnimation(parent: _animationController, curve: Curves.easeInOut);
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: themeObj.textBlack),
        ),
        backgroundColor: themeObj.primayColor,
        elevation: 0,
        title: Text(
          "Record",
          style: GoogleFonts.openSans(
            color: themeObj.textBlack,
            fontWeight: FontWeight.w500,
            fontSize: size.width * 0.05,
          ),
        ),
      ),
      body: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Transform.scale(
            scale: _animation.value,
            child: Opacity(
              opacity: _animation.value,
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: size.height * 0.02),
                      _buildFilterButtons(size),
                      SizedBox(height: size.height * 0.02),
                      // _buildInfoCard(size),
                      SizedBox(height: size.height * 0.02),
                      isLoading
                          ? Center(
                        child: LoadingAnimationWidget.threeArchedCircle(
                          color: themeObj.primayColor,
                          size: 50,
                        ),
                      )
                          : pendingTable(),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
      floatingActionButton: selectedFilter == "Pending"
          ? AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Transform.scale(
            scale: _animation.value,
            child: FloatingActionButton.extended(
              onPressed: updatePreviousRecord,
              backgroundColor: Color.fromRGBO(216, 180, 254, 1),
              icon: Icon(Icons.update, color: themeObj.textBlack),
              label: Text(
                "Update",
                style: GoogleFonts.openSans(
                  color: themeObj.textBlack,
                  fontWeight: FontWeight.w400,
                  fontSize: size.width * 0.045,
                ),
              ),
            ),
          );
        },
      )
          : null,
    );
  }

  Widget _buildFilterButtons(Size size) {
    return AnimationLimiter(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: AnimationConfiguration.toStaggeredList(
          duration: const Duration(milliseconds: 375),
          childAnimationBuilder: (widget) => SlideAnimation(
            horizontalOffset: 50.0,
            child: FadeInAnimation(
              child: widget,
            ),
          ),
          children: ['Pending', 'Checked'].map((filter) {
            return Padding(
              padding: EdgeInsets.only(right: size.width * 0.02),
              child: ElevatedButton(
                onPressed: () {
                  setState(() {
                    selectedFilter = filter;
                  });
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: selectedFilter == filter
                      ? themeObj.primayColor
                      : Color.fromRGBO(209, 213, 219, 1),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: size.width * 0.05,
                    vertical: size.height * 0.015,
                  ),
                ),
                child: Text(
                  filter,
                  style: GoogleFonts.openSans(
                    color: themeObj.textBlack,
                    fontWeight: FontWeight.w600,
                    fontSize: size.width * 0.035,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildInfoCard(Size size) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildInfoRow("Date", widget.date),
            _buildInfoRow("Chapter", widget.chapter),
            _buildInfoRow("Topic", widget.topic),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: GoogleFonts.openSans(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          Text(
            value,
            style: GoogleFonts.openSans(fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget pendingTable() {
    return AnimationLimiter(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: AnimationConfiguration.synchronized(
            duration: const Duration(milliseconds: 500),
            child: SlideAnimation(
              verticalOffset: 50.0,
              child: FadeInAnimation(
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 2,
                        blurRadius: 5,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(15),
                    child: Table(
                      border: TableBorder.all(
                        color: Colors.grey[300]!,
                        width: 1,
                      ),
                      columnWidths: {
                        0: FixedColumnWidth(100),
                        1: FixedColumnWidth(150),
                        2: FixedColumnWidth(120),
                        3: FixedColumnWidth(120),
                        4: FixedColumnWidth(120),
                        5: FixedColumnWidth(150),
                      },
                      children: [
                        pendingHeader(),
                        ...pendingRows(),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  TableRow pendingHeader() {
    return TableRow(
      decoration: BoxDecoration(color: themeObj.primayColor),
      children: [
        'Roll No.',
        'Name',
        'Date',
        'Chapter',
        'Topic',
        'Notebook Checked'
      ].map((header) => TableCell(
        child: Padding(
          padding: EdgeInsets.all(12),
          child: Text(
            header,
            style: GoogleFonts.openSans(
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> pendingRows() {
    List<Map<String, dynamic>> studentList = selectedFilter == "Pending" ? pendingStudentList! : checkedStudentList!;
    return studentList.asMap().entries.map((entry) {
      final index = entry.key;
      final student = entry.value;
      return TableRow(
        decoration: BoxDecoration(
          color: index.isEven ? Colors.grey[100] : Colors.white,
        ),
        children: [
          pendingTableCell(student["rollNumber"]?.toString() ?? ""),
          pendingTableCell(student['name']?.toString() ?? ""),
          pendingTableCell(widget.date),
          pendingTableCell(widget.chapter),
          pendingTableCell(widget.topic),
          newCheckboxCell(student['email']?.toString() ?? ""),
        ],
      );
    }).toList();
  }

  Widget pendingTableCell(String text) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Text(
          text,
          style: GoogleFonts.openSans(),
        ),
      ),
    );
  }

  Widget newCheckboxCell(String email) {
    return TableCell(
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Center(
          child: AnimatedSwitcher(
            duration: Duration(milliseconds: 300),
            transitionBuilder: (Widget child, Animation<double> animation) {
              return ScaleTransition(scale: animation, child: child);
            },
            child: selectedFilter == "Pending"
                ? Switch(
              value: checkedList.contains(email),
              activeColor: Colors.green,
              inactiveTrackColor: Colors.red[100],
              onChanged: (bool value) {
                setState(() {
                  if (value) {
                    checkedList.add(email);
                  } else {
                    checkedList.remove(email);
                  }
                });
              },
            )
                : Icon(Icons.check_circle, color: Colors.green, size: 30),
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../APIs/StudentModuleAPI/NoteBookRecord/noteBook_Record_API.dart';
import '../../APIs/StudentModuleAPI/StudentSubject/subjects.dart';
import '../../CustomTheme/customTheme.dart';

class NoteBookRecord extends StatefulWidget {
  const NoteBookRecord({super.key, required this.currentClass, required this.section,});
  final String currentClass;
  final String section;


  @override
  State<NoteBookRecord> createState() => _NoteBookRecordState();
}

class _NoteBookRecordState extends State<NoteBookRecord> {

  List<Map<String, dynamic>>? checkedStudentList;

  String selectedSubject="";
  List<String>? subjectOptions;
  List<String>  handleSubject=[
    ""
  ];


  bool isLoading=false;

  NotebookRecordApi notebookObj=NotebookRecordApi();

  Future<void> fetchNoteBookRecord() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      checkedStudentList =(await notebookObj.fetchNoteBookRecord(accessToken,selectedSubject)).cast<Map<String, dynamic>>();

    } catch (e) {
      print('Error fetching NoteBookRecord data: $e');
     showRedSnackBar('Error fetching NoteBookRecord data: $e', context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }



  Future<void> fetchSubjects() async {
    SharedPreferences pref=await SharedPreferences.getInstance();
    subjectOptions =pref.getStringList("subjects") ;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchSubjects();
    fetchNoteBookRecord();
  }

  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;

    CustomTheme themeObj=CustomTheme(size);
    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        ),
        backgroundColor: CustomTheme.primaryColor,
        title: Text(
          "NoteBook Record",
          style: themeObj.bigNormalText,
        ),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: size.width * 0.04),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height * 0.02),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Search by Subject",style: themeObj.bigNormalText,),
                  Card(
                    child: SizedBox(
                      width: size.width * 0.3,
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
                            checkedStudentList=[];
                            fetchNoteBookRecord();


                          });
                        },
                        items: subjectOptions==null ||  subjectOptions!.isEmpty? handleSubject.map((String option) {
                          return DropdownMenuItem<String>(
                            value: option,
                            child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
                          );
                        }).toList():
                        subjectOptions?.map((String option) {
                          return DropdownMenuItem<String>(
                            value: option,
                            child: Text(option, overflow: TextOverflow.ellipsis, style:themeObj.normalText),
                          );
                        }).toList(),
                      ),


                    ),
                  ),
                ],
              ),
              SizedBox(height: size.height * 0.01),
              isLoading? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: CustomTheme.primaryColor,
                  size: 50,
                ),
              ):
               checkedStudentList == null || checkedStudentList!.isEmpty? SizedBox(
                   height: size.height*0.7,
                   child: Center(child: Text("There was no NoteBook Record Found", style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)):
              Column(
                children: [
                  pendingTable(),
                  SizedBox(height: size.height*0.02,)
                ],
              )

            ],
          ),
        ),
      ),

    );

  }

  Widget pendingTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Table(
          border: TableBorder.all(),
          columnWidths: const {
            0: FixedColumnWidth(80),
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
    );
  }

  TableRow pendingHeader() {
    return TableRow(
      decoration: BoxDecoration(color: Colors.cyan[100]),
      children: [
        'Checked By',
        'Date',
        'Chapter',
        'Topic',
        'Checked'
      ].map((header) => TableCell(
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Text(
              header,
              style: const TextStyle(fontWeight: FontWeight.bold)
          ),
        ),
      )).toList(),
    );
  }

  List<TableRow> pendingRows() {


      return checkedStudentList!.map((student) {
        return TableRow(
          children: [
            pendingTableCell(student["by"]["name"]?.toString() ?? ""),
            pendingTableCell(student['date']?.toString() ?? ""),
            pendingTableCell(student["chapter"]?.toString() ?? ""),
            pendingTableCell(student["topic"]?.toString() ?? ""),
            newCheckboxCell(student['status']?.toString() ?? ""),
          ],
        );
      }).toList();
    }


  Widget pendingTableCell(String text) {
    return TableCell(
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Text(text),
      ),
    );
  }

  Widget newCheckboxCell(String status) {
    return TableCell(
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Switch(
            value: status=="true"?true:false,
            activeColor: Colors.green,
            onChanged: (bool value){}

        ),
      ),
    );
  }
}

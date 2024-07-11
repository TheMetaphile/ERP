import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/StudentsData/StudentApi.dart';
import 'package:untitled/utils/utils.dart';

class StudentEdit extends StatefulWidget {
  const StudentEdit({super.key, required this.studentDetail});
  final List<List<String>> studentDetail;

  @override
  State<StudentEdit> createState() => _StudentEditState();
}

class _StudentEditState extends State<StudentEdit> {
  final _formKey = GlobalKey<FormState>();
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, String> _initialValues = {};
  ScrollController scrollController1 = ScrollController();
  ScrollController scrollController2 = ScrollController();
  var _flag1 = false;
  var _flag2 = false;

  void listener1() {
    if (_flag2) return;
    _flag1 = true;
    scrollController2.jumpTo(scrollController1.offset);
    _flag1 = false;
  }

  void listener2() {
    if (_flag1) return;
    _flag2 = true;
    scrollController1.jumpTo(scrollController2.offset);
    _flag2=false;
  }

  @override
  void initState() {
    super.initState();
    scrollController1.addListener(listener1);
    scrollController2.addListener(listener2);
    for (var item in widget.studentDetail) {
      _controllers[item[0]] = TextEditingController(text: item[1]);
      _initialValues[item[0]] = item[1];
    }
  }

  @override
  void dispose() {
    _controllers.forEach((key, controller) => controller.dispose());
    super.dispose();
  }
bool isLoading=false;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: const Color(0xFF5A77BC),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios),
        ),
        title:   Text("Edit Student Details",style: GoogleFonts.openSans(fontSize:size.width*0.055,color:Colors.white,fontWeight:FontWeight.w600),),

      ),
      body: Stack(
        children: [
          secondStackLayer(size,context),
          Form(
            key: _formKey,
            child: SingleChildScrollView(
              child: Card(
                margin: EdgeInsets.all(0),
                color: Colors.white,
                child: Column(
                  children: widget.studentDetail.map((item) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8.0),
                      child: TextFormField(

                        controller: _controllers[item[0]],
                        decoration: InputDecoration(
                          labelText: item[0],
                          hintText: item[1],
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
         try{
           setState(() {
              isLoading=true;
           });
           StudentApi apiobj=StudentApi();
           Map<String, String> updatedValues ={};
           for (var item in widget.studentDetail) {
             final key = item[0];
             final newValue = _controllers[key]?.text ?? '';
             if (newValue != _initialValues[key]) {
               updatedValues[key] = newValue;
             }
           }
           if (updatedValues.isNotEmpty) {

             updatedValues["email"]=widget.studentDetail[2][1];
             print(updatedValues);
             SharedPreferences pref=await SharedPreferences.getInstance();
             String? accessToken=pref.getString("accessToken");
             final success = await apiobj.studentEditData(accessToken!, updatedValues);
             if (success) {
               showGreenSnackBar("'Student details updated successfully'", context);
               Navigator.pop(context);

             } else {
               showRedSnackBar("Failed to update student details", context);
             }
           }
           else{
             showRedSnackBar("Change Not Found", context);
           }

         }catch(e){
           print(e);
         }finally{
           setState(() {
             isLoading=false;
           });
         }
    },
        child: isLoading? CircularProgressIndicator():const Icon(Icons.save),
      ),
    );
  }
  Widget secondStackLayer(Size size,BuildContext context) {

    return SingleChildScrollView(
      controller: scrollController1,
      child: Column(
        children: [
          SizedBox(
            height: size.height * 0.15,
          ),
          Card(
            color: Colors.white,
            elevation: 0,
            margin: const EdgeInsets.all(0),
            shape: const OutlineInputBorder(
                borderSide: BorderSide(
                    color: Colors.white
                ),
                borderRadius: BorderRadius.only(
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25)
                )
            ),
            child: SizedBox(
              height: size.height * 3,
              width: size.width,

            ),
          ),
          SizedBox(
            height: size.height * 1,
          )
        ],
      ),
    );
  }
}
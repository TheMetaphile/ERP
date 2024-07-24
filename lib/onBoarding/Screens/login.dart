import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:page_transition/page_transition.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/teacher-module/TeacherHome.dart';
import 'package:untitled/teacher-module/techerClass.dart';
import '../../APIs/Authentication/teacherAuthenticationService.dart';
import '../../utils/theme.dart';
import '../../utils/utils.dart';
import '../utils/text_field.dart';
import 'Forget.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final authApiAcess = TeacherAuthentication();
  bool isLoading = false;


  Future<void> _handleLogin(BuildContext context) async {
    final email = emailController.text.trim();
    final password = passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      showRedSnackBar("Please enter both email and password", context);
      return;
    }

    setState(() {
      isLoading = true;
    });

    try {
      var data=await authApiAcess.loginUser(email, password, context);

      if(data=="Invalid Credentials"){
        showRedSnackBar("Invalid Email and Password", context);
      }

      else if(data["userDetails"]!=null){
        var userDetails= data["userDetails"];
        var tokens= data["tokens"];
        var subject= data["subject"];
        var classDetails= data["ClassDetails"];
        // print("User Details $userDetails");
        // print("tokens Details $tokens");
        // print("subject Details $subject");
        // print("classDetails Details $classDetails");

        SharedPreferences pref = await SharedPreferences.getInstance();
      if(userDetails!=null){
           final userEmail = userDetails["email"] ?? "email@gmail.com" ;
           final name = userDetails["name"] ?? "UserName";
           final profileLink = userDetails["profileLink"] ?? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" ;
           final employeeId = userDetails["employeeId"] ?? "ID123";
           final phoneNumber = userDetails["phoneNumber"] ?? "+91 ********";
           final dob = userDetails["DOB"] ?? "DD-MM-YYYY";
           final permanentAddress = userDetails["permanentAddress"] ?? "DD-MM-YYYY";

           await pref.setString("email", userEmail);
           await pref.setString("name", name);
           await pref.setString("profileLink", profileLink);
           await pref.setString("employeeId", employeeId);
           await pref.setString("phoneNumber", phoneNumber);
           await pref.setString("dob", dob);
           await pref.setString("permanentAddress", permanentAddress);

           // print(pref.getString("email"));
           // print(pref.getString("name"));
           // print(pref.getString("profileLink"));
           // print(pref.getString("employeeId"));
           // print(pref.getString("phoneNumber"));
           // print(pref.getString("dob",));
           // print(pref.getString("permanentAddress",));

      }

      if(tokens!=null){
        final accessToken = tokens["accessToken"];
        final refreshToken = tokens["refreshToken"];


        await pref.setString("accessToken", accessToken);
        await pref.setString("refreshToken", refreshToken);

        print(pref.getString("accessToken"));
      }

      if(subject!=null){

          if(subject["subjects"]!=null){
            List<dynamic> subjectsDetails=subject["subjects"];
            List<String> subjects=[];

            List<dynamic>? Classes;
            List<dynamic>? sections;

            for(int i=0;i<subjectsDetails.length;i++){
              final map=subjectsDetails[i];
              final sub=map["subject"]?? "sub";
              if(!subjects.contains(sub) && sub!="sub"){
                subjects.add(sub);
              }
              // if(!Classes!.contains(map["class"])){
              //   Classes[i]=map["class"];
              // }
              // if(!sections!.contains(map["sections"])){
              //   sections[i]=map["sections"];
              // }
            }

            if(subjects.isNotEmpty){
              await pref.setStringList("subjects", subjects);

            }
            print("subjects ${pref.get("subjects")}");

          }
          if(subject["Co_scholastic"]!=null){

            List<dynamic> Co_scholastic=subject["Co_scholastic"];
            List<String> Co_scholasticSubjects=[];
            List<dynamic>? Classes;
            List<dynamic>? sections;
            for(int i=0;i<Co_scholastic.length;i++){
              final map=Co_scholastic[i];
              final sub=map["subject"]?? "sub";
              if(!Co_scholasticSubjects.contains(sub) && sub!="sub"){
                Co_scholasticSubjects.add(sub);
              }
              }
            if(Co_scholasticSubjects.isNotEmpty){
              await pref.setStringList("Co_scholasticSubjects", Co_scholasticSubjects);

            }
            print( "Co_scholastic ${pref.get("Co_scholasticSubjects")}");
          }

      }

      if(classDetails!=null){
        final teacherSection = classDetails["section"] ?? "teacherSection" ;
        final teacherClass = classDetails["class"] ?? "teacherClass";

        await pref.setString("teacherSection", teacherSection);
        await pref.setString("teacherClass", teacherClass);
        print(pref.getString("teacherSection"));
        print(pref.getString("teacherClass"));
      }

        Navigator.push(context, MaterialPageRoute(builder: (context) => TeacherHome(),));
      }else{
        showRedSnackBar("Something went Wrong", context);
      }
    } catch (e) {
      print("Login error: $e");
      showRedSnackBar("An error occurred during login", context);
    } finally {

        setState(() {
          isLoading = false;
        });
    }
  }

  CustomTheme themeObj = CustomTheme();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: themeObj.primayColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            buildHeader(size),
            buildLoginForm(size, context),
          ],
        ),
      ),
    );
  }

  Widget buildHeader(Size size) {
    return SizedBox(
      height: size.height * 0.3,
      child: Padding(
        padding: EdgeInsets.only(top: size.height * 0.03),
        child: Align(
          alignment: Alignment.bottomCenter,
          child: Image.asset(
            "assets/onBoarding/Login/gif1.gif",
            fit: BoxFit.fitHeight,
          ),
        ),
      ),
    );
  }

  Widget buildLoginForm(Size size, BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(0),

      child: SizedBox(
        height: size.height * 0.7,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: size.width * 0.06),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: size.height * 0.03),
              buildLabelText("Your Email", size),
              SizedBox(height: size.height * 0.01),
              CustomTextField(controller: emailController, password: false),
              SizedBox(height: size.height * 0.03),
              buildLabelText("Password", size),
              SizedBox(height: size.height * 0.01),
              CustomTextField(controller: passwordController, password: true),
              SizedBox(height: size.height * 0.01),
              buildForgotPassword(context, size),
              SizedBox(height: size.height * 0.03),
              Center(child: continueButton(size, context)),
              SizedBox(height: size.height * 0.02),


            ],
          ),
        ),
      ),
    );
  }

  Widget buildLabelText(String text, Size size) {
    return Text(
      text,
      style: GoogleFonts.openSans(
        fontSize: size.width * 0.05,
        fontWeight: FontWeight.w400,
        color: themeObj.textBlack,
      ),
    );
  }

  Widget buildForgotPassword(BuildContext context, Size size) {
    return Align(
      alignment: Alignment.centerRight,
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            PageTransition(
              child: ForgetPassword(),
              curve: Curves.easeInOut,
              duration: const Duration(milliseconds: 400),
              type: PageTransitionType.bottomToTop,
            ),
          );
        },
        child: Text(
          "Forget password?",
          style: GoogleFonts.openSans(
            fontSize: size.width * 0.04,
            fontWeight: FontWeight.w400,
            color: themeObj.primayColor,
          ),
        ),
      ),
    );
  }

  Widget continueButton(Size size, BuildContext context) {
    return Card(
      color: isLoading ? Colors.transparent : themeObj.primayColor,
      elevation: isLoading ? 0 : 15,
      child: InkWell(
        onTap: isLoading ? null : () => _handleLogin(context),
        child: isLoading
            ? CircularProgressIndicator(color: themeObj.textgrey)
            : Padding(
          padding: EdgeInsets.all(size.width * 0.01),
          child: Center(
            child: AutoSizeText(
              "Continue",
              style: GoogleFonts.openSans(
                fontSize: 25,
                fontWeight: FontWeight.w500,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }




}

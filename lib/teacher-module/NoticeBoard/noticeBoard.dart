import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:untitled/APIs/Teacher%20Module/NoticeBoard/NoticeBoard.dart';
import 'package:untitled/utils/theme.dart';

import '../../utils/utils.dart';

class NoticeBoard extends StatefulWidget {
  const NoticeBoard({super.key});

  @override
  State<NoticeBoard> createState() => _NoticeBoardState();
}

class _NoticeBoardState extends State<NoticeBoard> {
  CustomTheme themeObj = CustomTheme();
  String selectedFilter = 'For You';
  NoticeBoardAPI apiObj = NoticeBoardAPI();
  bool isLoading = false;
  bool isLoadingMore = false;
  int start = 0;
  String session = "2024-25";
  String status = "for";
  List<dynamic> noticeData = [];
  final ScrollController _scrollController = ScrollController();

    String? selectCategory;
    List<String> categoryOption = [
      'Particular Students',
      'Particular Classes',

    ];
    TextEditingController title =TextEditingController();
    TextEditingController description =TextEditingController();

  Future<void> fetchNoticeData() async {
    setState(() {
      isLoading = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start, session, status);

      setState(() {
        noticeData = data;
        start += data.length;
      });
    } catch (e) {
      print('Error fetching noticeData data: $e');
      showRedSnackBar('Failed to load noticeData. Please try again.', context);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> fetchMoreNoticeData() async {
    if (isLoadingMore) return;

    setState(() {
      isLoadingMore = true;
    });
    try {
      SharedPreferences pref = await SharedPreferences.getInstance();
      String? accessToken = pref.getString("accessToken");

      if (accessToken == null) {
        throw Exception('Access token is null');
      }
      List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start, session, status);

      setState(() {
        noticeData.addAll(data);
        start += data.length;
      });
    } catch (e) {
      print('Error fetching more noticeData: $e');
      showRedSnackBar('Failed to load more notices. Please try again.', context);
    } finally {
      setState(() {
        isLoadingMore = false;
      });
    }
  }

    Future<void>publishPopup( BuildContext context ,Size size)async {
      bool isChecked = false;
      return showDialog(
        context: context,
        builder: (BuildContext context) {
          return StatefulBuilder(
            builder: (context, setState) {
              return  Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Card(
                    margin: const EdgeInsets.symmetric(horizontal: 10,),
                    elevation: 3,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Write Notice",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.045,fontWeight:FontWeight.w600,color: themeObj.textBlack,),),
                          SizedBox(height: size.height*0.02,),
                          Card(
                            child: SizedBox(
                              height: size.height*0.05,
                              child: DropdownButton<String>(
                                isExpanded: true,
                                borderRadius: BorderRadius.circular(12),
                                hint: const Text("Select",),
                                alignment: Alignment.center,
                                padding: EdgeInsets.all(8),
                                icon: Icon(Icons.keyboard_arrow_down_sharp),
                                underline: Container(),
                                value: selectCategory,
                                onChanged: (newValue) {
                                  setState(() {
                                    selectCategory = newValue!;
                                  });
                                },
                                items: categoryOption.map((String option) {
                                  return DropdownMenuItem<String>(
                                    value: option,
                                    child: Text(option,overflow: TextOverflow.ellipsis,),
                                  );
                                }).toList(),
                              ),
                            ),
                          ),
                          SizedBox(height: size.height*0.02,),
                          Text("Title",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack,),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                           padding: EdgeInsets.only(left: 8),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: Colors.grey,width: 1),
                              borderRadius: BorderRadius.circular(8),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(1),
                                  spreadRadius: 0,
                                  blurRadius: 5,
                                  offset: Offset(0, 6), // Adjust the vertical offset as needed
                                ),
                              ],
                            ),
                            child: TextField(

                              maxLines: 1,
                              decoration: InputDecoration(
                                border: InputBorder.none,
                              ),
                              controller: title,
                            ),
                          ),
                          SizedBox(height: size.height*0.02,),
                          Text("Description",textAlign: TextAlign.center,style: GoogleFonts.openSans(fontSize: size.width*0.035,color: themeObj.textBlack,),),
                          SizedBox(height: size.height*0.01,),
                          Container(
                            padding: EdgeInsets.only(left: 8),

                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: Colors.grey,width: 1),
                              borderRadius: BorderRadius.circular(8),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(1),
                                  spreadRadius: 0,
                                  blurRadius: 5,
                                  offset: Offset(0, 6), // Adjust the vertical offset as needed
                                ),
                              ],
                            ),
                            child: TextField(
                              maxLines: 8,
                              decoration: InputDecoration(
                                border: InputBorder.none,
                              ),
                              controller: description,
                            ),
                          ),
                          SizedBox(height: size.height*0.02,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Container(
                                width: size.width*0.3,
                                child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(backgroundColor:Color.fromRGBO(209,213,219,1),shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey,width: 1),borderRadius: BorderRadius.circular(8))),
                                    onPressed: (){
                                      Navigator.pop(context);
                                    },
                                    child: Text("Cancel",style: GoogleFonts.openSans(fontSize:size.width*0.035,color:Colors.black),)),
                              ),
                              Container(
                                width: size.width * 0.3,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(backgroundColor: Color(0XFF6FF87D), shape: RoundedRectangleBorder(side: BorderSide(color: Colors.grey, width: 1), borderRadius: BorderRadius.circular(8))),
                                  onPressed: () async {
                                    if (selectCategory != null && title.text.isNotEmpty && description.text.isNotEmpty) {

                                    } else {

                                      showRedSnackBar("Please fill all fields", context);
                                    }
                                  },
                                  child: isLoading
                                      ? CircularProgressIndicator(color: Colors.black)
                                      : Text("Submit", style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),),
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
            },);

        },);

    }

  @override
  void initState() {
    super.initState();
    fetchNoticeData();
    _scrollController.addListener(_scrollListener);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreNoticeData();
    }
  }
  @override
  Widget build(BuildContext context) {
  print(noticeData);
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor:themeObj.textWhite,
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back_ios,color:themeObj.textBlack,),
        ),
        backgroundColor: themeObj.primayColor,
        title: Text("Notice Board",style: TextStyle(color: themeObj.textBlack,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),
          actions: [
            ElevatedButton.icon(
              icon: Icon(Icons.add_circle, size: 15,color: themeObj.textWhite,),
              label: Text("Publish",style: GoogleFonts.openSans(color: themeObj.textWhite,fontWeight: FontWeight.w400,fontSize: size.width*0.035),),
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                backgroundColor: Color.fromRGBO(216,180,254,1),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ), onPressed: () {
              publishPopup(context,size);
            },
            )
          ]
      ),

      body: Container(
        padding: EdgeInsets.all(12),
        width: size.width,
        height: size.height*1,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildFilterButtons(size),
            SizedBox(height: size.height*0.02,),
            Expanded(
              child: isLoading
                  ? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: themeObj.primayColor,
                  size: 50,
                ),
              ): noticeData.isEmpty? Center(child: Text("No Notice Data Found"),)
                  : ListView.builder(
                controller: _scrollController,
                itemCount: noticeData.length + 1,
                itemBuilder: (context, index) {
                  if (index < noticeData.length) {
                    final notice = noticeData[index];
                    print(noticeData.length);
                    return _buildNoticeCard(notice, size);
                  } else if (isLoadingMore) {
                    print(noticeData.length);
                    print("load more");
                    return Center(
                      child: Padding(
                        padding: EdgeInsets.all(8.0),
                        child: LoadingAnimationWidget.threeArchedCircle(
                          color: themeObj.primayColor,
                          size: 50,
                        )
                      ),
                    );
                  } else {
                    return SizedBox.shrink();
                  }
                },
              ),
            ),

          ],
        ),
      ),
    );
  }
  Widget _buildFilterButtons(Size size) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: ['For You', 'By You'].map((filter) {
        return Padding(
          padding: EdgeInsets.only(right: size.width * 0.02),
          child: ElevatedButton(
            onPressed: () {
              setState(() {
                selectedFilter = filter;
                status = filter.split(" ")[0].toLowerCase();
                start = 0;
                noticeData = [];
                fetchNoticeData();
              });
            },

            style: ElevatedButton.styleFrom(
              backgroundColor: selectedFilter == filter
                  ? themeObj.primayColor
                  : Color.fromRGBO(209, 213, 219, 1),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),

              ),
            ),
            child: Text(
              filter,
              style: GoogleFonts.openSans(
                color: themeObj.textBlack,
                fontWeight: FontWeight.w400,
                fontSize: size.width * 0.035,
              ),
            ),
            // ... rest of the button styling
          ),
        );
      }).toList(),
    );
  }

  Widget _buildNoticeCard(dynamic notice, Size size) {
    return Column(
      children: [
        Card(
          margin: EdgeInsets.all(0),
          elevation: 3,
          child: ExpansionTile(
            shape: Border.all(color: Colors.transparent),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text("Title: ", style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w500, fontSize: size.width * 0.035)),
                    SizedBox(width: size.width * 0.02),
                    SizedBox(
                      width: size.width*0.5,
                      child: AutoSizeText(notice["title"],overflow: TextOverflow.ellipsis, style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.035)),
                    ),
                  ],
                ),
                SizedBox(height: size.height * 0.02),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Text("By:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w500, fontSize: size.width * 0.035)),
                        SizedBox(width: size.width * 0.03),
                        CircleAvatar(
                          radius: size.width * 0.045,
                          backgroundImage: NetworkImage(notice["from"]["profileLink"]),
                        ),
                        SizedBox(width: size.width * 0.02),
                        Text(notice["from"]["name"], style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.035)),
                      ],
                    ),
                    Text(notice["date"], style: TextStyle(color: themeObj.textgrey, fontWeight: FontWeight.w400, fontSize: size.width * 0.035)),
                  ],
                ),
              ],
            ),
            children: [
              Padding(
                padding: EdgeInsets.all(size.height * 0.02),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Description:", style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w500, fontSize: size.width * 0.035)),
                    SizedBox(height: size.height * 0.01),
                    AutoSizeText(
                      notice["description"],
                      style: GoogleFonts.openSans(color: themeObj.textBlack, fontWeight: FontWeight.w400, fontSize: size.width * 0.035),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: size.height * 0.02)
      ],
    );
  }

}

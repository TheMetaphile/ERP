import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../APIs/StudentModuleAPI/Notice/notice_API.dart';
import '../../CustomTheme/customTheme.dart';

class Notice extends StatefulWidget {
  const Notice({super.key});

  @override
  State<Notice> createState() => _NoticeState();
}

class _NoticeState extends State<Notice> {

  String selectedFilter = 'For You';
  NoticeBoardAPI apiObj = NoticeBoardAPI();
  bool isLoading = false;
  bool isLoadingMore = false;
  int start = 0;
  String session = "2024-25";
  String status = "for";
  List<dynamic> noticeData = [];
  final ScrollController _scrollController = ScrollController();


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
      List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start,);

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
      List<dynamic> data = await apiObj.fetchNoticeBoard(accessToken, start, );

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

  @override
  void initState() {
    super.initState();
    fetchNoticeData();
    _scrollController.addListener(_scrollListener);
  }
  void _scrollListener() {
    if (_scrollController.position.pixels == _scrollController.position.maxScrollExtent) {
      fetchMoreNoticeData();
    }
  }
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);
    return Scaffold(
      backgroundColor:CustomTheme.whiteColor,
      appBar: AppBar(
          leading: IconButton(
            onPressed: (){
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back_ios,color:CustomTheme.blackColor,),
          ),
          backgroundColor: CustomTheme.primaryColor,
          title: Text("Notice Board",style: TextStyle(color: CustomTheme.blackColor,fontWeight: FontWeight.w400,fontSize: size.width*0.05),),

      ),

      body: Container(
        padding: const EdgeInsets.all(12),
        width: size.width,
        height: size.height*1,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            Expanded(
              child: isLoading
                  ? Center(
                child: LoadingAnimationWidget.threeArchedCircle(
                  color: CustomTheme.primaryColor,
                  size: 50,
                ),
              ): noticeData.isEmpty?  Center(child: Text("No Notice Data Found", style: TextStyle(fontSize: 18, color: Colors.grey[600]),),)
                  : ListView.builder(
                controller: _scrollController,
                itemCount: noticeData.length + 1,
                itemBuilder: (context, index) {
                  if (index < noticeData.length) {
                    final notice = noticeData[index];
                    print(noticeData.length);
                    return _buildNoticeCard(notice, size,themeObj);
                  } else if (isLoadingMore) {
                    print(noticeData.length);
                    print("load more");
                    return Center(
                      child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: LoadingAnimationWidget.threeArchedCircle(
                            color: CustomTheme.primaryColor,
                            size: 50,
                          )
                      ),
                    );
                  } else {
                    return const SizedBox.shrink();
                  }
                },
              ),
            ),

          ],
        ),
      ),
    );
  }


  Widget _buildNoticeCard(dynamic notice, Size size,CustomTheme themeObj) {
    return Column(
      children: [
        Card(
          margin: const EdgeInsets.all(0),
          elevation: 3,
          child: ExpansionTile(
            shape: Border.all(color: Colors.transparent),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text("Title: ", style:themeObj.bigNormalText),
                    SizedBox(width: size.width * 0.02),
                    SizedBox(
                      width: size.width*0.5,
                      child: AutoSizeText(notice["title"],overflow: TextOverflow.ellipsis, style: themeObj.normalText),
                    ),
                  ],
                ),
                SizedBox(height: size.height * 0.02),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Text("By:", style: themeObj.normalText),
                        SizedBox(width: size.width * 0.03),
                        CircleAvatar(
                          radius: size.width * 0.045,
                          backgroundImage: NetworkImage(notice["from"]["profileLink"]),
                        ),
                        SizedBox(width: size.width * 0.02),
                        Text(notice["from"]["name"], style:themeObj.normalText),
                      ],
                    ),
                    Text(notice["date"], style: themeObj.normalText),
                  ],
                ),
              ],
            ),
            children: [
              Padding(
                padding: EdgeInsets.all(size.height * 0.02),
                child: SizedBox(
                  width: size.width,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Description:",textAlign: TextAlign.start, style:themeObj.bigNormalText),
                      SizedBox(height: size.height * 0.01),
                      AutoSizeText(
                        notice["description"],textAlign: TextAlign.start,
                        style: themeObj.normalText,
                      ),
                    ],
                  ),
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

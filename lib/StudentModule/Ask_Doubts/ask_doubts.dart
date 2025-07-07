import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_staggered_animations/flutter_staggered_animations.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:shimmer/shimmer.dart';

import '../../CustomTheme/customTheme.dart';
import 'askDoubtBloc/ask_doubt_bloc.dart';
import 'askDoubtBloc/ask_doubt_event.dart';
import 'askDoubtBloc/ask_doubt_state.dart';


class AskDoubts extends StatefulWidget {
  const AskDoubts({super.key, required this.currentClass, required this.section});
  final String currentClass;
  final String section;

  @override
  State<AskDoubts> createState() => _AskDoubtsState();
}

class _AskDoubtsState extends State<AskDoubts> with SingleTickerProviderStateMixin {
  String selectedSubject = "";
  String status = "Pending";
  List<String> statusOptions = ['Pending', 'Resolved', 'Rejected'];
  final ScrollController _scrollController = ScrollController();
  final TextEditingController question = TextEditingController();

  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();

    final bloc = context.read<AskDoubtBloc>();
    final currentState = bloc.state;

    print("🟡 Current isInitial flag: ${currentState.isInitial}");

    if (currentState.isInitial) {
      print("🟢 First-time fetch: Dispatching FetchSubjects and FetchDoubts");
      bloc.add(FetchSubjects());
      bloc.add(FetchDoubts(
        status: status,
        selectedSubject: selectedSubject,
      ));
    } else {
      print("🔵 Skipping fetch — state already initialized");
    }

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
    question.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      final state = context.read<AskDoubtBloc>().state;
      if (!state.isLoadingMore && !state.allDataLoaded) {
        context.read<AskDoubtBloc>().add(FetchMoreDoubts(
          status: status,
          selectedSubject: selectedSubject,
          start: state.doubtList?.length ?? 0,
        ));
      }
    }
  }

  void showRedSnackBar(String message, BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: GoogleFonts.poppins(color: Colors.white)),
        backgroundColor: Colors.red,
      ),
    );
  }

  void showGreenSnackBar(String message, BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: GoogleFonts.poppins(color: Colors.white)),
        backgroundColor: Colors.green,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    CustomTheme themeObj = CustomTheme(size);

    return Scaffold(
      backgroundColor: CustomTheme.whiteColor,
      appBar: _buildAppBar(size, themeObj),
      body: RefreshIndicator(
        onRefresh: () async {
          context.read<AskDoubtBloc>().add(FetchDoubts(
            status: status,
            selectedSubject: selectedSubject,
          ));
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
    return AppBar(
      elevation: 0,
      backgroundColor: CustomTheme.primaryColor,
      title: Text(
        "My Doubts",
        style: GoogleFonts.poppins(
          fontSize: size.width * 0.045,
          fontWeight: FontWeight.w500,
          color: CustomTheme.blackColor,
        ),
      ),
      leading: IconButton(
        icon: Icon(Icons.arrow_back_ios, color: CustomTheme.blackColor),
        onPressed: () => Navigator.pop(context),
      ),
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
    return BlocBuilder<AskDoubtBloc, AskDoubtState>(
      builder: (context, state) {
        return Container(
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: CustomTheme.primaryColor.withOpacity(0.1),
            borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(30),
              bottomRight: Radius.circular(30),
            ),
          ),
          child: Row(
            children: [
              Expanded(
                child: _buildDropdown(
                  hint: "Subject",
                  value: selectedSubject.isEmpty ? null : selectedSubject,
                  items: state.subjectOptions ?? [""],
                  onChanged: (newValue) {
                    setState(() {
                      selectedSubject = newValue!;
                      context.read<AskDoubtBloc>().add(FetchDoubts(
                        status: status,
                        selectedSubject: selectedSubject,
                      ));
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
                      context.read<AskDoubtBloc>().add(FetchDoubts(
                        status: status,
                        selectedSubject: selectedSubject,
                      ));
                    });
                  },
                ),
              ),
            ],
          ),
        );
      },
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
    return BlocBuilder<AskDoubtBloc, AskDoubtState>(
      builder: (context, state) {
        if (state.isLoading) {
          return _buildShimmerEffect(size);
        }

        if (state.doubtList == null || state.doubtList!.isEmpty) {
          return Center(
            child: Text(
              "No Doubts found!",
              style: GoogleFonts.poppins(fontSize: 16, color: Colors.grey[600]),
            ),
          );
        }

        return AnimationLimiter(
          child: ListView.builder(
            itemCount: state.doubtList!.length + (state.isLoadingMore ? 1 : 0),
            controller: _scrollController,
            padding: EdgeInsets.all(5),
            shrinkWrap: true,
            itemBuilder: (context, index) {
              if (index == state.doubtList!.length) {
                return Center(child: CircularProgressIndicator());
              }
              return AnimationConfiguration.staggeredList(
                position: index,
                duration: const Duration(milliseconds: 375),
                child: SlideAnimation(
                  verticalOffset: 50.0,
                  child: FadeInAnimation(
                    child: _buildDoubtCard(state.doubtList![index], size, themeObj, index),
                  ),
                ),
              );
            },
          ),
        );
      },
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

  Widget _buildDoubtCard(Map<String, dynamic> doubt, Size size, CustomTheme themeObj, int index) {
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
                      fontSize: size.width * 0.045,
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
                      style: GoogleFonts.poppins(color: Colors.white, fontSize: size.width * 0.035),
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
                    style: GoogleFonts.poppins(fontWeight: FontWeight.w500, fontSize: size.width * 0.035),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    doubt['question'],
                    style: GoogleFonts.poppins(fontSize: size.width * 0.04),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "Date: ${doubt['date']}",
                    style: GoogleFonts.poppins(color: Colors.grey, fontSize: size.width * 0.035),
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
                        updateAskDoubtPopup(context, size, themeObj, doubt, index);
                      },
                    ),
                    const SizedBox(width: 8),
                    _buildActionButton(
                      icon: Icons.delete,
                      color: Colors.red,
                      onPressed: () {
                        context.read<AskDoubtBloc>().add(DeleteDoubt(
                          doubtId: doubt["_id"],
                          currentClass: widget.currentClass,
                        ));
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

  Widget _buildSolutionExpansionTile(Map<String, dynamic> doubt, CustomTheme themeObj, Size size) {
    return Theme(
      data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
      child: ExpansionTile(
        title: Text(
          "View Solution",
          style: GoogleFonts.poppins(fontWeight: FontWeight.w600, fontSize: size.width * 0.04),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  doubt['solution'],
                  style: GoogleFonts.poppins(fontSize: size.width * 0.035),
                ),
                const SizedBox(height: 8),
                Text(
                  "Replied on: ${doubt['replyDate']}",
                  style: GoogleFonts.poppins(color: Colors.grey, fontSize: size.width * 0.035),
                ),
                const SizedBox(height: 8),
                if (doubt['teacher'].isNotEmpty)
                  Row(
                    children: [
                      CircleAvatar(
                        backgroundImage: NetworkImage(doubt['teacher'][0]['profileLink']),
                        radius: size.width * 0.045,
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
        askDoubtPopup(context, size, themeObj);
      },
      backgroundColor: CustomTheme.primaryColor,
      icon: const Icon(CupertinoIcons.add_circled, color: Colors.white),
      label: Text(
        "Ask Doubt",
        style: GoogleFonts.poppins(color: Colors.white, fontWeight: FontWeight.w600),
      ),
    );
  }

  Future<void> askDoubtPopup(BuildContext context, Size size, CustomTheme themeObj) async {
    String localSelectedSubject = selectedSubject;
    question.clear();

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: SizedBox(
                      width: size.width * 0.9,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: size.height * 0.01),
                          Text(
                            "To ask a doubt, please select class and subject and write your question. You can also attach photos for references.",
                            textAlign: TextAlign.center,
                            style: themeObj.normalText,
                          ),
                          SizedBox(height: size.height * 0.01),
                          BlocBuilder<AskDoubtBloc, AskDoubtState>(
                            builder: (context, state) {
                              return Card(
                                child: SizedBox(
                                  width: size.width,
                                  height: size.height * 0.05,
                                  child: DropdownButton<String>(
                                    isExpanded: true,
                                    borderRadius: BorderRadius.circular(12),
                                    hint: Text("Subject", style: themeObj.normalText),
                                    padding: EdgeInsets.all(8),
                                    icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
                                    alignment: Alignment.center,
                                    underline: Container(),
                                    value: localSelectedSubject.isEmpty ? null : localSelectedSubject,
                                    onChanged: (newValue) {
                                      setState(() {
                                        localSelectedSubject = newValue!;
                                      });
                                    },
                                    items: (state.subjectOptions ?? [""]).map((String option) {
                                      return DropdownMenuItem<String>(
                                        value: option,
                                        child: Text(option, overflow: TextOverflow.ellipsis, style: themeObj.normalText),
                                      );
                                    }).toList(),
                                  ),
                                ),
                              );
                            },
                          ),
                          SizedBox(height: size.height * 0.03),
                          Text("Your Question", textAlign: TextAlign.center, style: themeObj.normalText),
                          SizedBox(height: size.height * 0.01),
                          TextField(
                            maxLines: 5,
                            decoration: InputDecoration(
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            controller: question,
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              SizedBox(
                                width: size.width * 0.3,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color.fromRGBO(209, 213, 219, 1),
                                    shape: RoundedRectangleBorder(
                                      side: const BorderSide(color: Colors.grey, width: 1),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                  child: Text(
                                    "Cancel",
                                    style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.3,
                                child: BlocBuilder<AskDoubtBloc, AskDoubtState>(
                                  builder: (context, state) {
                                    return ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color(0xFF6FF87D),
                                        shape: RoundedRectangleBorder(
                                          side: const BorderSide(color: Colors.grey, width: 1),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                      ),
                                      onPressed: () async {
                                        if (question.text.isNotEmpty && localSelectedSubject.isNotEmpty) {
                                          context.read<AskDoubtBloc>().add(AskNewDoubt(
                                            subject: localSelectedSubject,
                                            question: question.text,
                                          ));
                                          Navigator.pop(context);
                                        } else {
                                          showRedSnackBar("Please fill all fields", context);
                                        }
                                      },
                                      child: state.isLoading
                                          ? const CircularProgressIndicator(color: Colors.black)
                                          : Text(
                                        "Submit",
                                        style: GoogleFonts.openSans(
                                          fontSize: size.width * 0.035,
                                          color: Colors.black,
                                        ),
                                      ),
                                    );
                                  },
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
          },
        );
      },
    );
  }

  Future<void> updateAskDoubtPopup(
      BuildContext context, Size size, CustomTheme themeObj, Map<String, dynamic> doubtData, int index) async {
    String localSelectedSubject = doubtData['subject'];
    TextEditingController questionController = TextEditingController(text: doubtData['question']);

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: SizedBox(
                      width: size.width * 0.9,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(height: size.height * 0.01),
                          Text(
                            "To update a doubt, please select class and subject and write your question.",
                            textAlign: TextAlign.center,
                            style: themeObj.normalText,
                          ),
                          SizedBox(height: size.height * 0.01),
                          BlocBuilder<AskDoubtBloc, AskDoubtState>(
                            builder: (context, state) {
                              return Card(
                                child: SizedBox(
                                  width: size.width,
                                  height: size.height * 0.05,
                                  child: DropdownButton<String>(
                                    isExpanded: true,
                                    borderRadius: BorderRadius.circular(12),
                                    hint: Text("Subject", style: themeObj.normalText),
                                    padding: const EdgeInsets.all(8),
                                    icon: Icon(Icons.keyboard_arrow_down_sharp, color: CustomTheme.greyColor),
                                    alignment: Alignment.center,
                                    underline: Container(),
                                    value: localSelectedSubject.isEmpty ? null : localSelectedSubject,
                                    onChanged: (newValue) {
                                      setState(() {
                                        localSelectedSubject = newValue!;
                                      });
                                    },
                                    items: (state.subjectOptions ?? [""]).map((String option) {
                                      return DropdownMenuItem<String>(
                                        value: option,
                                        child: Text(option, overflow: TextOverflow.ellipsis, style: themeObj.normalText),
                                      );
                                    }).toList(),
                                  ),
                                ),
                              );
                            },
                          ),
                          SizedBox(height: size.height * 0.03),
                          Text("Your Question", textAlign: TextAlign.center, style: themeObj.normalText),
                          SizedBox(height: size.height * 0.01),
                          TextField(
                            maxLines: 5,
                            decoration: InputDecoration(
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            controller: questionController,
                          ),
                          SizedBox(height: size.height * 0.02),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              SizedBox(
                                width: size.width * 0.3,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color.fromRGBO(209, 213, 219, 1),
                                    shape: RoundedRectangleBorder(
                                      side: const BorderSide(color: Colors.grey, width: 1),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                  child: Text(
                                    "Cancel",
                                    style: GoogleFonts.openSans(fontSize: size.width * 0.035, color: Colors.black),
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: size.width * 0.3,
                                child: BlocBuilder<AskDoubtBloc, AskDoubtState>(
                                  builder: (context, state) {
                                    return ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color(0xFF6FF87D),
                                        shape: RoundedRectangleBorder(
                                          side: const BorderSide(color: Colors.grey, width: 1),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                      ),
                                      onPressed: () async {
                                        if (questionController.text.isNotEmpty && localSelectedSubject.isNotEmpty) {
                                          context.read<AskDoubtBloc>().add(UpdateDoubt(
                                            doubtId: doubtData['_id'],
                                            updatedDoubt: {
                                              '_id': doubtData['_id'],
                                              'subject': localSelectedSubject,
                                              'question': questionController.text,
                                            },
                                            currentClass: widget.currentClass,
                                          ));
                                          Navigator.pop(context);
                                        } else {
                                          showRedSnackBar("Please fill all fields", context);
                                        }
                                      },
                                      child: state.isLoading
                                          ? const CircularProgressIndicator(color: Colors.black)
                                          : Text(
                                        "Update",
                                        style: GoogleFonts.openSans(
                                          fontSize: size.width * 0.035,
                                          color: Colors.black,
                                        ),
                                      ),
                                    );
                                  },
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
          },
        );
      },
    );
  }
}
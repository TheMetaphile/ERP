import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:metaphile_erp/Screens/Home/screens/fullScreenImage.dart';
import 'package:staggered_grid_view_flutter/widgets/staggered_grid_view.dart';
import 'package:staggered_grid_view_flutter/widgets/staggered_tile.dart';

class SchoolGallery extends StatelessWidget {
  const SchoolGallery({super.key});
  final List<StaggeredTile> _staggeredTiles = const <StaggeredTile>[
    StaggeredTile.count(2, 2),
    StaggeredTile.count(2, 1),
    StaggeredTile.count(1, 2),
    StaggeredTile.count(1, 1),
    StaggeredTile.count(2, 2),
    StaggeredTile.count(1, 2),
    StaggeredTile.count(1, 1),
    StaggeredTile.count(4, 4),
    StaggeredTile.count(1, 1),
    StaggeredTile.count(3, 1),
    StaggeredTile.count(4, 1),
    StaggeredTile.count(2, 2),
    StaggeredTile.count(2, 1),
    StaggeredTile.count(1, 2),
    StaggeredTile.count(1, 1),
    StaggeredTile.count(2, 2),
    StaggeredTile.count(1, 2),
    StaggeredTile.count(1, 1),
    StaggeredTile.count(4, 3),
  ];

  @override
  Widget build(BuildContext context) {
    final List<Widget> _list = [
      InkWell(
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) {
            return OpenImage(imagePath: "assets/Gallery/Harsh/3.jpg");
          },));
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Harsh/3.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Tushar/1.jpg");
              },
            ),
          );
          },
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(0),
            image: const DecorationImage(image: AssetImage("assets/Gallery/Tushar/1.jpg"),fit: BoxFit.cover)
        ),

      ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Harsh/1.jpg");
              },
            ),
          );
          },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Harsh/1.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),

      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/2.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Bhuv/2.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Tushar/2.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Tushar/2.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Harsh/2.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Harsh/2.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),


      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/3.jpg");
              },
            ),
          );
          },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Bhuv/3.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Tushar/3.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Tushar/3.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/1.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Bhuv/1.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),

      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Tushar/4.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Tushar/4.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/5.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Bhuv/5.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/6.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(image: AssetImage("assets/Gallery/Bhuv/6.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),

      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/7.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/7.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/8.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/8.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/9.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/9.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/10.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/10.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/11.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/11.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/12.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/12.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),
      InkWell(
        onTap: () {
          Navigator.push(context,
            MaterialPageRoute(builder: (context) {
              return OpenImage(imagePath: "assets/Gallery/Bhuv/13.jpg");
            },
            ),
          );
        },
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              image: const DecorationImage(
                  image: AssetImage("assets/Gallery/Bhuv/13.jpg"),fit: BoxFit.cover)
          ),

        ),
      ),

    ];
    Size size = MediaQuery.of(context).size;
    return Stack(
        children: [
          Container(
            height: size.height*0.126,
            width: size.width,
            color: const Color.fromRGBO(103,135,214, 1),
            child: Image.asset("assets/Navigation/changePassword/starpattern.png"),
          ),
          Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              elevation: 0,
              backgroundColor: Colors.transparent,
              titleSpacing: 0,
              leading: IconButton(onPressed: (){
                Navigator.pop(context);
              }, icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.white,)),
              title: AutoSizeText("School Gallery",style: GoogleFonts.openSans(color: Colors.white),)
            ),
          ),
          Column(
            children: [
              SizedBox(
                height: size.height*0.1,
              ),
              Card(
                color: Colors.white,
                margin: const EdgeInsets.all(0),
                shape: const OutlineInputBorder(
                    borderRadius: BorderRadius.only(
                        topRight: Radius.circular(30),
                        topLeft: Radius.circular(30)
                    )
                ),
                child: SizedBox(
                  height: size.height*0.9,
                  width: size.width,
                  child: Padding(
                    padding: EdgeInsets.only(top: size.height*0.01,left: size.height*0.01,right: size.height*0.01),
                    child: StaggeredGridView.count(
                        crossAxisCount: 4,
                        staggeredTiles: _staggeredTiles,
                        mainAxisSpacing: 4,
                        crossAxisSpacing: 4,
                        padding: const EdgeInsets.all(4),
                        children: _list
                    ),
                  ),
                )
              ),
            ],
          )
        ]
    );
  }
}

import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(home: TeacherDetailsCard()));
}



class TeacherDetailsCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Basic Details',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('assets/teacher_image.jpg'),
            ),
            SizedBox(height: 16),
            Text(
              'Bhuvneshwar Tyagi',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text(
              'Maths & Science Teacher',
              style: TextStyle(fontSize: 14, color: Colors.grey),
            ),
            SizedBox(height: 16),
            _buildInfoTile(Icons.phone, 'Phone:', '8888855555'),
            _buildInfoTile(Icons.email, 'Email:', 'bhanu68tyagi@gmail.com'),
            _buildInfoTile(Icons.location_on, 'Address:', 'Ghar'),
            _buildInfoTile(Icons.school, 'Education:', 'B.Tech'),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoTile(IconData icon, String label, String value) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, size: 20),
          SizedBox(width: 8),
          Expanded(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label, style: TextStyle(fontWeight: FontWeight.bold)),
                Text(value),
                Icon(Icons.edit, size: 16),
              ],
            ),
          ),
        ],
      ),
    );
  }
}


// class TabbedTeacherProfile extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return DefaultTabController(
//       length: 2,
//       child: Scaffold(
//         appBar: AppBar(
//           title: Text('Teacher Profile'),
//           bottom: TabBar(
//             tabs: [
//               Tab(text: 'Basic Info'),
//               Tab(text: 'Contact'),
//             ],
//           ),
//         ),
//         body: TabBarView(
//           children: [
//             _buildBasicInfoTab(),
//             _buildContactTab(),
//           ],
//         ),
//       ),
//     );
//   }
//
//   Widget _buildBasicInfoTab() {
//     return ListView(
//       padding: EdgeInsets.all(16),
//       children: [
//         CircleAvatar(
//           radius: 50,
//           backgroundImage: AssetImage('assets/teacher_image.jpg'),
//         ),
//         SizedBox(height: 16),
//         Text('Bhuvneshwar Tyagi', textAlign: TextAlign.center, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
//         Text('Maths & Science Teacher', textAlign: TextAlign.center),
//         SizedBox(height: 16),
//         _buildInfoTile('Education:', 'B.Tech'),
//       ],
//     );
//   }
//
//   Widget _buildContactTab() {
//     return ListView(
//       padding: EdgeInsets.all(16),
//       children: [
//         _buildInfoTile('Phone:', '8888855555'),
//         _buildInfoTile('Email:', 'bhanu68tyagi@gmail.com'),
//         _buildInfoTile('Address:', 'Ghar'),
//       ],
//     );
//   }
//
//   Widget _buildInfoTile(String label, String value) {
//     return ListTile(
//       title: Text(label),
//       subtitle: Text(value),
//       trailing: Icon(Icons.edit),
//     );
//   }
// }
//
//
// class SliverTeacherProfile extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: CustomScrollView(
//         slivers: [
//           SliverAppBar(
//             expandedHeight: 200,
//             pinned: true,
//             flexibleSpace: FlexibleSpaceBar(
//               title: Text('Bhuvneshwar Tyagi'),
//               background: Icon(Icons.person),
//             ),
//           ),
//           SliverToBoxAdapter(
//             child: Padding(
//               padding: EdgeInsets.all(16),
//               child: Text('Maths & Science Teacher', textAlign: TextAlign.center),
//             ),
//           ),
//           SliverList(
//             delegate: SliverChildListDelegate([
//               _buildInfoTile(Icons.school, 'Education:', 'B.Tech'),
//               _buildInfoTile(Icons.phone, 'Phone:', '8888855555'),
//               _buildInfoTile(Icons.email, 'Email:', 'bhanu68tyagi@gmail.com'),
//               _buildInfoTile(Icons.location_on, 'Address:', 'Ghar'),
//             ]),
//           ),
//         ],
//       ),
//     );
//   }
//
//   Widget _buildInfoTile(IconData icon, String label, String value) {
//     return ListTile(
//       leading: Icon(icon),
//       title: Text(label),
//       subtitle: Text(value),
//       trailing: Icon(Icons.edit),
//     );
//   }
// }
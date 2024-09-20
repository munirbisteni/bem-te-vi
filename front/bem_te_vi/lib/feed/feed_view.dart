import 'package:flutter/material.dart';
import 'package:bem_te_vi/profile/profile_view.dart';

class FeedView extends StatefulWidget {
  const FeedView({super.key});

  @override
  FeedViewState createState() => FeedViewState();
}

class FeedViewState extends State<FeedView> {
  int _selectedIndex = 0;

  static final List<Widget> _screens = [
    FeedContent(), // The actual feed content is separated to handle navigation
    ProfileView(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}

// Separate widget for the feed content
class FeedContent extends StatelessWidget {
  final List<String> posts = [
    'Post 1',
    'Post 2',
    'Post 3', // Example posts
  ];

  FeedContent({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BemTeVi'),
      ),
      body: ListView.builder(
        itemCount: posts.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(posts[index]),
          );
        },
      ),
    );
  }
}

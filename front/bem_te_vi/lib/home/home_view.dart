import 'package:bem_te_vi/post/post_view.dart';
import 'package:bem_te_vi/profile/profile_view.dart';
import 'package:flutter/material.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  HomeViewState createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  int _currentIndex = 0;

  final List<Widget> _posts = [
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
    PostCard(
      username: 'Username',
      image: Image.asset('assets/post-placeholder.jpg'),
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 100,
      comments: 50,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BemTeVi'),
      ),
      body: Scrollbar(
        child: ListView(
          children: [
            Column(
              children: _posts,
            )
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });

          if (index == 1) {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ProfileView()),
          );
    }
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}

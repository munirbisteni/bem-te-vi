import 'post_controller.dart';
import 'package:flutter/material.dart';
import 'post_card.dart';
import 'package:bem_te_vi/models/post.dart';

class PostsView extends StatefulWidget {
  const PostsView({super.key});

  @override
  PostsViewState createState() => PostsViewState();
}

class PostsViewState extends State<PostsView> {
  final _controller = PostController();
  List<Post> _posts = [];
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _fetchPosts();
  }

  Future<void> _fetchPosts() async {
    try {
      final postsData = await _controller.getPostsByFollowing();
      setState(() {
        _posts = postsData.map<Post>((json) => Post.fromJson(json)).toList();
        _isLoading = false;
      });
    } on Exception catch (e) {
      setState(() {
        _isLoading = false;
        _errorMessage = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_errorMessage != null) {
      return Center(child: Text(_errorMessage!));
    }

    return ListView.builder(
      itemCount: _posts.length,
      itemBuilder: (context, index) {
        return PostCard(post: _posts[index]);
      },
    );
  }
}

import 'package:bem_te_vi/post/post_controller.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:bem_te_vi/models/post.dart';

class PostCard extends StatefulWidget {
  final Post post;

  const PostCard({super.key, required this.post}); 

  @override
  PostCardState createState() => PostCardState();
}

class PostCardState extends State<PostCard> {
  final _controller = PostController();
  late String currentUserId;
  bool isLiked = false;

  @override
  void initState() {
    super.initState();
    _loadCurrentUser();
  }

  Future<void> _loadCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    currentUserId = prefs.getString('userId') ?? '';
    _checkIfLiked();
  }

  void _checkIfLiked() {
    setState(() {
      isLiked = widget.post.likes.contains(currentUserId);
    });
  }

  Future<void> _likePost() async {
  if (isLiked) {
    await _controller.unlikePost(widget.post.id);
    setState(() {
      widget.post.likes.remove(currentUserId);
      isLiked = false;
    });
  } else {
    await _controller.likePost(widget.post.id);
    setState(() {
      widget.post.likes.add(currentUserId);
      isLiked = true;
    });
  }
}

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Autor: ${widget.post.authorId}'),
            Image.asset('assets/post-placeholder.jpg'),
            Text(
              widget.post.description,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                IconButton(
                  icon: Icon(
                    Icons.thumb_up,
                    color: isLiked ? Colors.blue : Colors.grey,
                  ),
                  onPressed: _likePost,
                ),
                const SizedBox(width: 4),
                Text('${widget.post.likes.length}'),
                const SizedBox(width: 16),
                const Icon(Icons.comment, color: Colors.grey),
                const SizedBox(width: 4),
                Text('${widget.post.comments.length}'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

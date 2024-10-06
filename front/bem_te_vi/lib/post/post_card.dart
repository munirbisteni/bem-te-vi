import 'package:flutter/material.dart';
import 'package:bem_te_vi/models/post.dart';

class PostCard extends StatelessWidget {
  final Post post;

  const PostCard({super.key, required this.post}); 

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
            Text('Autor: ${post.authorId}'),
            Image.asset('assets/post-placeholder.jpg'),
            Text(
              post.description,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const Icon(Icons.thumb_up, color: Colors.blue),
                const SizedBox(width: 4),
                Text('${post.likes.length}'),
                const SizedBox(width: 16),
                const Icon(Icons.comment, color: Colors.grey),
                const SizedBox(width: 4),
                Text('${post.comments.length}'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:bem_te_vi/models/post.dart';

class PostCard extends StatelessWidget {
  final Post post;

  PostCard({required this.post}); 

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Autor: ${post.authorId}'),
            Image.asset('assets/post-placeholder.jpg'),
            Text(
              post.description,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Icon(Icons.thumb_up, color: Colors.blue),
                SizedBox(width: 4),
                Text('${post.likes.length}'),
                SizedBox(width: 16),
                Icon(Icons.comment, color: Colors.grey),
                SizedBox(width: 4),
                Text('${post.comments.length}'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

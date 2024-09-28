import 'package:flutter/material.dart';

class PostCard extends StatelessWidget {
  final String username;
  final Image image;
  final String caption;
  final int likes;
  final int comments;

  const PostCard({
    super.key,
    required this.username,
    required this.image,
    required this.caption,
    required this.likes,
    required this.comments,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Card(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Cabeçalho
            ListTile(
              title: Text(username),
            ),
            // Imagem
            Image.asset('assets/post-placeholder.jpg'),
            // Descrição
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(caption),
            ),
            // Likes e comentários
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.favorite),
                Text('$likes likes'),
                const SizedBox(width: 16),
                const Icon(Icons.comment),
                Text('$comments comments'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

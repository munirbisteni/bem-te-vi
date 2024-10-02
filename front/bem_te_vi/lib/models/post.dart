class Post {
  final String id;
  final String description;
  final String authorId;
  final List<dynamic> likes;
  final List<dynamic> comments;

  Post({
    required this.id,
    required this.description,
    required this.authorId,
    required this.likes,
    required this.comments,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      description: json['description'],
      authorId: json['author'],
      likes: json['likes'],
      comments: json['comments'],
    );
  }
}

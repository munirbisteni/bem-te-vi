import 'post_service.dart';

class PostController {
  final PostService _postService = PostService();

  Future<List<dynamic>> getPostsByUser() async {
    try {
      return await _postService.getPostsByUser();
    } on Exception {
      rethrow;
    }
  }
}

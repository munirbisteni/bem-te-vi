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

  Future<List<dynamic>> getPostsByFollowing() async {
    try {
      return await _postService.getPostsByFollowing();
    } on Exception {
      rethrow;
    }
  }

  Future<void> likePost(String postId) async {
    try {
      return await _postService.likePost(postId);
    } on Exception {
      rethrow;
    }
  }

  Future<void> unlikePost(String postId) async {
    try {
      return await _postService.unlikePost(postId);
    } on Exception {
      rethrow;
    }
  }
}

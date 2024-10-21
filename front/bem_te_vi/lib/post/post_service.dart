import 'dart:convert';
import 'package:http/http.dart';

import '/network/api_client.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PostService {
  Future<List<dynamic>> getPostsByUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getString('userId');
    
    final response = await apiClient.get('posts/user/$userId');
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load posts');
    }
  }

  Future<List<dynamic>> getPostsByFollowing() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getString('userId');
    
    final response = await apiClient.get('posts/user/$userId/following');
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load posts');
    }
  }

  Future<void> likePost(String postId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('userId');

      final response = await apiClient.post('posts/$postId/like/$userId');

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Falha ao curtir post: ${response.body}');
      }
    } on Exception {
      rethrow;
    }
  }

  Future<void> unlikePost(String postId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('userId');
    
      final response = await apiClient.post('posts/$postId/unlike/$userId');

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Falha ao descurtir post: ${response.body}');
      }
    } on Exception {
      rethrow;
    }
  }
}

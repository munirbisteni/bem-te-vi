import 'dart:convert';
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
}

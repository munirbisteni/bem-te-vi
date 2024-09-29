import 'dart:convert';
import '/network/api_client.dart';

class LoginService {
  Future<Map<String, dynamic>> login(String username, String password) async {
    try {
      final response = await apiClient.post(
        'auth/login',
        { 'username': username, 'password': password}
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Falha no login: ${response.body}');
      }
    } on Exception {
      rethrow;
    }
  }
}

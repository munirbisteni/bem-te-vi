import 'dart:convert';
import '/network/api_client.dart';

class SignupService {
  Future<Map<String, dynamic>> signup(String email, String username, String password) async {
    try {
      final response = await apiClient.post(
        'auth/signup',
        { 'email': email, 'username': username, 'password': password}
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Falha ao criar conta: ${response.body}');
      }
    } on Exception {
      rethrow;
    }
  }
}

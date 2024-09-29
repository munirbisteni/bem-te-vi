import 'package:shared_preferences/shared_preferences.dart';
import 'signup_service.dart';

class SignupController {
  final SignupService _signupService = SignupService();

  Future<String?> signup(String email, String username, String password) async {
    try {
      final data = await _signupService.signup(email, username, password);
      final accessToken = data['accessToken'];

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('accessToken', accessToken);

      return accessToken;
    } on Exception {
      rethrow;
    }
  }
}

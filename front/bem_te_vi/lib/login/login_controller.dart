import 'package:shared_preferences/shared_preferences.dart';
import 'login_service.dart';

class LoginController {
  final LoginService _loginService = LoginService();

  Future<String?> login(String username, String password) async {
    try {
      final data = await _loginService.login(username, password);
      final accessToken = data['accessToken'];
      final userId = data['userId'];

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('accessToken', accessToken);
      await prefs.setString('userId', userId);

      return accessToken;
    } on Exception {
      rethrow;
    }
  }
}

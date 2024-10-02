import 'package:flutter/material.dart';
import 'login/login_view.dart';
import 'signup/signup_view.dart';
import 'home/home_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BemTeVi',
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginView(),
        '/signup': (context) => const SignupView(),
        '/home': (context) => const HomeView()
      },
    );
  }
}

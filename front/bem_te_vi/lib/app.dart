import 'package:flutter/material.dart';

import 'login/login_view.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BemTeVi',
      theme: ThemeData(
        primarySwatch: Colors.yellow,
      ),
      home: const LoginView(),
    );
  }
}

import 'package:flutter/material.dart';

import 'package:bem_te_vi/home/home_view.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BemTeVi',
      theme: ThemeData(
        primarySwatch: Colors.yellow,
      ),
      home: const HomeView(),
    );
  }
}

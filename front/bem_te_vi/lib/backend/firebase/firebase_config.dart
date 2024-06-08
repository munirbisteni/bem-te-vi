import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyBxQlDdWZnihG3xCc15M11hjrKQh5bJfbs",
            authDomain: "bem-te-vi-ijnpws.firebaseapp.com",
            projectId: "bem-te-vi-ijnpws",
            storageBucket: "bem-te-vi-ijnpws.appspot.com",
            messagingSenderId: "335403283312",
            appId: "1:335403283312:web:9bc9d6b71458d9ff3815b5"));
  } else {
    await Firebase.initializeApp();
  }
}

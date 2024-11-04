import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    // Check if username and password fields are filled
    if (!username || !password) {
      setAlertMessage('Please enter both username and password');
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Store the JWT token in AsyncStorage
        await AsyncStorage.setItem('accessToken', data.accessToken);
        await AsyncStorage.setItem('userId', data.userId)

        // Navigate to home screen
        router.replace('/(tabs)/');
      } else {
        // Handle login error from API response
        setAlertMessage(data.message || 'Invalid username or password');
        setTimeout(() => setAlertMessage(null), 3000);
      }
    } catch (error) {
      setLoading(false);
      setAlertMessage('Network error. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={handleSignIn} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => router.push('/sign-up')}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {alertMessage && (
        <View style={[styles.alertBox, { backgroundColor: '#F44336' }]}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#333',
    marginRight: 10,
  },
  signUpButton: {
    backgroundColor: '#888',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  alertBox: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

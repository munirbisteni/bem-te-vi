import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertColor, setAlertColor] = useState<string>('#4CAF50'); // Default green for success
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !displayName || !username || !password || !confirmPassword) {
      setAlertMessage('All fields are required');
      setAlertColor('#F44336'); // Red for error
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setAlertColor('#F44336');
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    // API call to sign up
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8081/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          displayName,
          username,
          password,
          about: null,
          profileImage: null,
          following: null,
          followers: null }),
      });

      const data = await response.json();
      setLoading(false);
      console.log(response);
      if (response.ok) {
        // Show success alert
        setAlertMessage('Sign-up successful!');
        setAlertColor('#4CAF50'); // Green for success
        setTimeout(() => {
          setAlertMessage(null);
          router.replace('/'); // Redirect to sign-in
        }, 3000);
      } else {
        // Show error from the response
        setAlertMessage(data.message || 'Sign-up failed');
        setAlertColor('#F44336'); // Red for error
        setTimeout(() => setAlertMessage(null), 3000);
      }
    } catch (error) {
      setLoading(false);
      setAlertMessage('Network error. Please try again.');
      setAlertColor('#F44336');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={displayName}
        onChangeText={setDisplayName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      {alertMessage && (
        <View style={[styles.alertBox, { backgroundColor: alertColor }]}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
    </View>
  );
};

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
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
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

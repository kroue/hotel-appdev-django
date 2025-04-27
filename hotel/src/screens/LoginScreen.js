import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from '../api/axios'; // Ensure this points to your axios instance

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('/auth/login/', {
            username: email, // Assuming email is used as the username
            password,
        });

        if (response.status === 200) {
            Alert.alert('Success', 'Login successful!');
            navigation.navigate('Rooms');
        }
    } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'Login failed');
    }
};

const handleLogout = async () => {
  try {
      const response = await axios.post('logout/');
      if (response.status === 200) {
          Alert.alert('Success', 'Logout successful!');
          navigation.navigate('Login');
      }
  } catch (error) {
      Alert.alert('Error', 'Logout failed');
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Please Log In to your account to continue.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.forgotPassword}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff3366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 10,
  },
});
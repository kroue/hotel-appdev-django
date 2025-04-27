import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from '../api/axios';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
      try {
          console.log('Sending registration request:', { username, email, password, address });
          const response = await axios.post('/auth/register/', {
              username,
              email,
              password,
              address,
          });
          console.log('Registration response:', response);

          if (response.status === 201) {
              Alert.alert('Success', 'Registration successful!');
              navigation.navigate('Login');
          }
      } catch (error) {
          if (error.response) {
              console.error('Server responded with error:', error.response.data);
              Alert.alert('Error', error.response.data.message || 'Registration failed');
          } else if (error.request) {
              console.error('No response received:', error.request);
              Alert.alert('Error', 'No response from server');
          } else {
              console.error('Error setting up request:', error.message);
              Alert.alert('Error', 'An unexpected error occurred');
          }
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
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
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginRedirect}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, marginBottom: 15 },
  registerButton: { width: '100%', height: 50, backgroundColor: '#ff3366', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginRedirect: { color: '#007bff', fontSize: 14, marginTop: 10 },
});
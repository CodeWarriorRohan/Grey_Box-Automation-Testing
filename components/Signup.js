import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, } from 'react-native';
import React, {useState} from 'react';
import {showToast} from '../utils/showToast';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');

  // Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword || !mobile) {
      showToast({
        type: 'error',
        message: 'Please fill in all fields.',
      });
      return;
    }

    if (name.length < 2) {
      showToast({
        type: 'error',
        message: 'Full Name must be at least of 2 letters.',
      });
      return;
    }

    if (!emailRegex.test(email)) {
      showToast({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      showToast({
        type: 'error',
        message:
          'Password must be at least 8 characters long and include:\n- 1 uppercase letter\n- 1 number\n- 1 special character.',
      });
      return;
    }

    if (password !== confirmPassword) {
      showToast({type: 'error', message: 'Password and Confirm Password do not match.'});
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      showToast({
        type: 'error',
        message: 'Mobile Number must be exactly 10 digits.',
      });
      return;
    }

    // Simulating Signup success
    showToast({type: 'success', message: 'Now you can Login!'});
    navigation.navigate('Login');
  };

  return (
    <View testID="signupScreen" style={styles.container}>
      {/* Top Image */}
      <View style={styles.topImageContainer}>
        <Image
          testID="topVector"
          source={require('../assets/topVector.png')}
          style={styles.topImage}
        />
      </View>

      {/* Greeting */}
      <View style={styles.helloContainer}>
        <Text testID="welcomeText" style={styles.helloText}>
          Welcome
        </Text>
        <Text testID="createNewAccountText" style={styles.signUpText}>
          Create a new account
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            testID="nameInput"
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            testID="emailInput"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            // keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            testID="passwordInput"
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            testID="confirmPasswordInput"
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TextInput
            testID="mobileInput"
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#888"
            value={mobile}
            onChangeText={setMobile}
            // keyboardType="phone-pad"
          />
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          testID="signupButton"
          style={styles.signupButton}
          onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Navigate to Login */}
        <TouchableOpacity
          testID="loginButton"
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  topImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topImage: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  helloContainer: {
    marginBottom: 10,
    padding: 20,
  },
  helloText: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '500',
    color: '#262626',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#262626',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 15,
  },
});

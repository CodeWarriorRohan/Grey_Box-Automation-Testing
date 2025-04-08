import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {showToast} from '../utils/showToast'; // Import showToast


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email validation regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Password validation regex pattern
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Password must be 8+ characters, include 1 uppercase, 1 number, and 1 special character

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!email || !password) {
          showToast({
            type: 'error',
            message: 'Please enter both email and password.',
          });
          return;
        }

    if (!emailRegex.test(trimmedEmail)) {
          showToast({
            type: 'error',
            message: 'Please enter a valid email address.',
          });
          return;
        }

    if (!passwordRegex.test(trimmedPassword)) {
          showToast({
            type: 'error',
            message:
              'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.',
          });
          return;
        }

     // Simulating login success
        showToast({type: 'success', message: 'Login successful!'});
        navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.topImageContainer}>
        <Image testID="topVector" source={require("../assets/topVector.png")} style={styles.topImage} />
      </View>

      {/* Top Section with Guest Access */}
      <View style={styles.topSection}>
        <TouchableOpacity testID="guestButton" onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.guestText}>Guest</Text>
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.helloContainer}>
        <Text testID="helloText" style={styles.helloText}>Hello</Text>
        <Text testID="loginNowText" style={styles.loginText}>Login Now</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput  
            testID="emailInput"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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
        </View>

        {/* Login Button */}
        <TouchableOpacity testID="loginButton" style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity testID="signupButton" style={styles.signupButton} onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupButtonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  guestText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  topImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  topImage: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
  },
  helloContainer: {
    marginBottom: 10,
    padding: 20,
  },
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  signupButtonText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

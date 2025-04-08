import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const DashboardScreen = ({ navigation }) => {
  return (
    <View testID="dashboardScreen" style={styles.container}>
      {/* Top Image */}
      <View style={styles.topImageContainer}>
        <Image source={require("../assets/topVector.png")} style={styles.topImage} />
      </View>

      {/* Greeting */}
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Welcome</Text>
        <Text style={styles.subHeader}>To Dashboard</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Automation unit testing is a process where individual components of a software application
          are tested automatically to validate their correctness. It helps in early bug detection,
          improves code quality, and ensures efficient software development. Popular testing frameworks
          include Jest, Mocha, and JUnit.
        </Text>

        <Text style={styles.benefitsHeader}>Key Benefits:</Text>

        <View style={styles.listContainer}>
          <Text style={styles.listItem}>✅ Faster testing with automation</Text>
          <Text style={styles.listItem}>✅ Detects bugs early in development</Text>
          <Text style={styles.listItem}>✅ Reduces manual testing efforts</Text>
          <Text style={styles.listItem}>✅ Ensures code stability and reliability</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        testID="logoutButton" 
        style={styles.logoutButton} 
        onPress={() => navigation?.navigate("Login")}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
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
    fontSize: 50,
    fontWeight: "500",
    color: "#262626",
  },
  subHeader: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
    color: "#007BFF",
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },
  benefitsHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  listContainer: {
    paddingLeft: 5,
  },
  listItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

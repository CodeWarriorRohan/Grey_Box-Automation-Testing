// import Toast from "react-native-toast-message";

// // Function to show toast messages
// export const showToast = (type, message) => {
//   Toast.show({
//     type,
//     text1: message,
//     position: "top",
//     visibilityTime: 3000, // Toast disappears after 3 seconds
//     autoHide: true,
//   });
// };

// // Toast component that must be rendered inside App.js
// export const CustomToast = () => <Toast />;


import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

// Function to trigger the toast
const showToast = ({type, message, duration = 2000, position = 'top'}) => {
  Toast.show({
    type,
    text1: message,
    position,
    visibilityTime: duration,
    autoHide: true,
  });
};

// Custom configuration for different toast types
const toastConfig = {
  success: ({text1}) => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.toastText} numberOfLines={1}>
        {text1}
      </Text>
    </View>
  ),
  error: ({text1}) => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.toastText} numberOfLines={1}>
        {text1}
      </Text>
    </View>
  ),
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

// Styles for the toast component
const styles = StyleSheet.create({
  toastContainer: {
    padding: 15,
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9', // Shady white background
    // alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: 'green',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  success: {
    borderColor: 'green',
    borderWidth: 1,
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  toastText: {
    color: 'black', // Black text color
    fontSize: 16,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});

export {showToast, CustomToast};

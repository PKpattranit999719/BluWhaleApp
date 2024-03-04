import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./loginScreen";

const HomeScreen: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
      if (loggedInUserEmail) {
        // If user is logged in, set loggedIn to true and store the username
        setLoggedIn(true);
        setUsername(loggedInUserEmail);
      }
    } catch (error) {
      console.error('Error checking login status: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the logged-in user's session data
      await AsyncStorage.removeItem('loggedInUserEmail');
      // Reset state and update UI
      setLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D466B'}}>
      {loggedIn ? (
        <View>
          <Text>Welcome, {username}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <LoginScreen />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default HomeScreen;

// HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./loginScreen";

const HomeScreen: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if user is logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedInUserEmail = await AsyncStorage.getItem("loggedInUserEmail");
      if (loggedInUserEmail) {
        // If user is logged in, set loggedIn to true and store the username
        setLoggedIn(true);
        setUsername(loggedInUserEmail);
      }
    } catch (error) {
      console.error("Error checking login status: ", error);
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2D466B",
      }}
    >
      {loggedIn ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2D466B",
          }}
        >
          <Image
            source={require("../assets/bluWhale_LOGO.png")}
            style={{ width: 350, height: 350 }}
          />
          <Text style={{ color: "white" }}>Welcome, {username}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>:~Logout~:</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Image
            source={require("../assets/bluWhale_LOGO.png")}
            style={{ width: 350, height: 350 }}
          />
          <LoginScreen onLogin={() => checkLoginStatus()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e77f4",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;

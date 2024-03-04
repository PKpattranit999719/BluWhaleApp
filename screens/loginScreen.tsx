import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./homeScreen"; // Import HomeScreen component
import { Image } from "react-native";

// Sample login data
const sampleLoginData = [
  { email: "test", password: "test" },
  { email: "user2@example.com", password: "password2" },
  { email: "user3@example.com", password: "password3" },
];

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      const userEmail = await AsyncStorage.getItem("loggedInUserEmail");
      setLoggedInUser(userEmail);
    }
    fetchLoggedInUser();
  }, []);

  const handleLogin = async () => {
    // Check if the entered email and password match any sample login data
    const matchedUser = sampleLoginData.find(
      (user) => user.email === email && user.password === password
    );
    if (matchedUser) {
      try {
        // Save the logged-in user's email in AsyncStorage
        await AsyncStorage.setItem("loggedInUserEmail", email);
        // Set the logged-in user
        setLoggedInUser(email);
        // Close the modal after login
        setModalVisible(false);
      } catch (error) {
        console.error("Error saving login data: ", error);
      }
    } else {
      // If no matching user found, display an alert
      console.log("Invalid email or password"); // Add this line to log the error
      alert("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      {loggedInUser ? (
        <HomeScreen username={loggedInUser} /> 
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setEmail("");
                  setPassword("");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#1e77f4",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;

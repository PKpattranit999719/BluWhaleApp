import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LoginModal = ({ visible, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberCredentials, setRememberCredentials] = useState(false);

  useEffect(() => {
    retrieveRememberedCredentials();
  }, []);

  const handleLoginSubmit = () => {
    onLogin(email, password);
    if (rememberCredentials) {
      storeRememberedCredentials();
    } else {
      clearRememberedCredentials();
      setEmail("");
      setPassword("");
    }
  };

  const storeRememberedCredentials = async () => {
    try {
      await AsyncStorage.setItem("rememberedEmail", email);
      await AsyncStorage.setItem("rememberedPassword", password);
    } catch (error) {
      console.error("Error storing remembered credentials: ", error);
    }
  };

  const retrieveRememberedCredentials = async () => {
    try {
      const rememberedEmail = await AsyncStorage.getItem("rememberedEmail");
      const rememberedPassword = await AsyncStorage.getItem(
        "rememberedPassword"
      );
      if (rememberedEmail && rememberedPassword) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRememberCredentials(true);
      }
    } catch (error) {
      console.error("Error retrieving remembered credentials: ", error);
    }
  };

  const clearRememberedCredentials = async () => {
    try {
      await AsyncStorage.removeItem("rememberedEmail");
      await AsyncStorage.removeItem("rememberedPassword");
    } catch (error) {
      console.error("Error clearing remembered credentials: ", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
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
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setRememberCredentials(!rememberCredentials)}
            >
              <View
                style={[styles.checkbox, rememberCredentials && styles.checked]}
              >
                {rememberCredentials && (
                  <Ionicons name="checkmark" size={15} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
            <Text>Remember me</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#0b114f",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
});

export default LoginModal;

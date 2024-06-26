import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useAuth } from "../authContext";
import RegisterModal from "../modal/registerModal";
import { sampleUsers } from "../sampleData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginModal from "../modal/loginModal";

const HomeScreen: React.FC = () => {
  const { loggedIn, username, login, register } = useAuth();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    checkLoginStatus();
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedInUserEmail = await AsyncStorage.getItem("loggedInUserEmail");
      if (loggedInUserEmail) {
        login(loggedInUserEmail);
      }
    } catch (error) {
      console.error("Error checking login status: ", error);
    }
  };

  const handleLogin = () => {
    setLoginModalVisible(true);
  };

  const handleLoginSubmit = async (email, password) => {
    if (!email || !password) {
      Alert.alert("Please enter your email and password.");
      return;
    }

    const user = sampleUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setLoginModalVisible(false);
      login(user.username);
      try {
        await AsyncStorage.setItem("loggedInUserEmail", email);
      } catch (error) {
        console.error("Error storing logged-in user email: ", error);
      }
    } else {
      Alert.alert("Wrong Email Or Password.");
    }
  };

  const handleRegister = () => {
    setRegisterModalVisible(true);
  };

  const handleRegisterSubmit = (username, email, password, birthdate) => {
    register(username, email, birthdate, password);
    setRegisterModalVisible(false);
    Alert.alert("Register Successfully.");
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/bluWhale_LOGO.png")}
            style={{ width: 350, height: 350 }}
          />
          <Text style={{ color: "white", fontSize: 20 }}>
            Welcome, {username}
          </Text>
          <Text style={{ color: "white",fontSize: 20}}>{currentDate}</Text>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/bluWhale_LOGO.png")}
            style={{ width: 350, height: 350 }}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>:~Login~:</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>:~Register~:</Text>
          </TouchableOpacity>
        </View>
      )}
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onLogin={handleLoginSubmit}
      />
      {/* Register Modal */}
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        onRegister={handleRegisterSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HomeScreen;

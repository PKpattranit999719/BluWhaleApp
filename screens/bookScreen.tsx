import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { sampleUsers } from "../sampleData";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";

const BookScreen: React.FC = () => {
  const { username, loggedIn } = useAuth(); // Get the currently logged-in user's username and login state
  const navigation = useNavigation();
  // Find the user object based on the username
  const currentUser = sampleUsers.find((user) => user.username === username);

  const handleLoginPress = () => {
    if (!loggedIn) {
      navigation.navigate("Home");
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
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        {username ? `${username}'s Books:` : "Please log in to view books"}
      </Text>
      {loggedIn ? (
        currentUser?.books && currentUser?.books.length > 0 ? ( // Check if the user has books
          <FlatList
            data={currentUser.books} // Display books for the current user
            renderItem={({ item }) => (
              <View>
                <Text style={{ fontSize: 16, color: "white" }}>
                  {item.title} by {item.author}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={{ fontSize: 16, color: "white" }}>
            You don't have any book here
          </Text>
        )
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>:~Login~:</Text>
        </TouchableOpacity>
      )}
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

export default BookScreen;

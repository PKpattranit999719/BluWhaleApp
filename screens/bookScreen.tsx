import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { sampleUsers } from "../sampleData";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";

const BookScreen: React.FC = () => {
  const { username, loggedIn } = useAuth();
  const navigation = useNavigation();
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
        currentUser?.books && currentUser?.books.length > 0 ? ( 
          <FlatList
            data={currentUser.books} 
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Text style={{ fontSize: 16, color: "white" }}>{item.title} by {item.author}</Text>
                <Text style={{ fontSize: 16, color: "white" }}>{item.catagory}</Text>
                <Text style={{ fontSize: 16, color: "white" }}>{item.description}</Text>
                <Image source={item.image} style={{ width: 80, height: 80 }} />
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
  container: {
    justifyContent: "center",
    alignItems: "center",
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
});

export default BookScreen;

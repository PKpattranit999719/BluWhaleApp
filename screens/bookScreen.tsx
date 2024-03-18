import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAuth } from "../authContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookDetailScreen from "./bookDetailScreen";
import { sampleUsers } from "../sampleData";

const Stack = createStackNavigator();

function BookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="My Book"
        component={BookScreen}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: "Book Detail" }}
      />
    </Stack.Navigator>
  );
}

const BookScreen: React.FC = () => {
  const { username, loggedIn } = useAuth();
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginPress = () => {
    if (!loggedIn) {
      navigation.navigate("Home");
    }
  };

  const handleBookPress = (book) => {
    navigation.navigate("BookDetail", { book });
  };

  const fetchUserData = useCallback(() => {
    const user = sampleUsers.find((user) => user.username === username);
    setCurrentUser(user);
  }, [username]);

  useFocusEffect(fetchUserData);

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
        currentUser && currentUser.books.length > 0 ? (
          <FlatList
            data={currentUser.books}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleBookPress(item)}
                style={styles.bookItem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={item.image}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Text style={styles.bookTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
          />
        ) : (
          <Text style={styles.noBooksText}>No books found for this user</Text>
        )
      ) : (
        <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
          <Text style={styles.buttonText}>:~Login~:</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 16,
  },
  noBooksText: {
    fontSize: 16,
    color: "white",
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

export default function BookScreenWrapper() {
  return <BookStack />;
}

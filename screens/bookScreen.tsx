import React, { useCallback, useState } from "react";
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>
        {username ? `${username}'s Books:` : "Please log in to view books"}
      </Text>
      <View style={styles.booksContainer}>
        {loggedIn ? (
          currentUser && currentUser.books.length > 0 ? (
            <FlatList
              data={currentUser.books}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleBookPress(item)}
                  style={styles.bookItem}
                >
                  <Image
                    source={item.image}
                    style={styles.bookImage}
                  />
                  <Text style={styles.bookTitle}>{item.title}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D466B",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    marginBottom: 10,
  },
  booksContainer: {
    alignItems: "center",
  },
  bookItem: {
    marginBottom: 20,
    alignItems: "center",
  },
  bookImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  noBooksText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 20,
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

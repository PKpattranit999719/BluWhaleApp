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
import { sampleUsers, sampleBooks } from "../sampleData";
import Icon from "react-native-vector-icons/FontAwesome";

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
  const [randomBooks, setRandomBooks] = useState([]);

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


    setRandomBooks(sampleBooks.slice(4, 8));
  }, [username]);

  useFocusEffect(fetchUserData);

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          {randomBooks.length > 0 && (
            <View>
              <Text
                style={{
                  marginBottom: 20,
                  marginLeft: 10,
                  fontSize: 37,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                เรื่องที่มาใหม่
              </Text>
              {randomBooks.map((book, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleBookPress(book)}
                  style={styles.bookItem}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.bookTitle}>
                      {index + 1} {book.title}
                    </Text>
                    {book.isNew === 1 && (
                      <View
                        style={[
                          styles.newBadge,
                          { marginLeft: 5, paddingLeft: 5, paddingRight: 5 },
                        ]}
                      >
                        <Text style={styles.newBadgeText}>
                          {" "}
                          New{" "}
                          <Icon name="arrow-up" size={12} color="black" />
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  marginBottom: 30,
                }}
              ></View>
            </View>
          )}

          {currentUser && currentUser.books.length > 0 ? (
            <View style={styles.box}>
              <Text
                style={{
                  marginBottom: 20,
                  marginLeft: 10,
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                หนังสือของฉัน
              </Text>
              <FlatList
                horizontal
                data={currentUser.books}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleBookPress(item)}
                    style={[styles.bookItem, { width: 80 }]}
                  >
                    <View>
                      <Image source={item.image} style={styles.bookImage} />
                    </View>
                    <Text style={{ color: "black", marginTop: 10 }}>{item.title}</Text>
                    <View>
                      {item.isUpdate === 1 && (
                        <View
                          style={[
                            styles.updateBadge,
                            { paddingLeft: 5, paddingRight: 5, marginTop: 10  },
                          ]}
                        >
                          <Text style={styles.updateBadgeText}>
                            {" "}
                            Update{" "}
                            <Icon name="arrow-up" size={12} color="white" />
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title}
              />
            </View>
          ) : (
            <Text style={styles.noBooksText}>No books found for this user</Text>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.noBooksText}>Please log in to view books</Text>
          <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
            <Text style={styles.buttonText}>:~Login~:</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D466B",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    marginBottom: 10,
  },
  bookItem: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
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
  },
  noBooksText: {
    fontSize: 20,
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
  box: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 30,
    backgroundColor: "#DAE9FF",
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  updateBadge: {
    backgroundColor: "green",
    borderRadius: 5,
  },
  updateBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
  newBadge: {
    backgroundColor: "#DAA520",
    borderRadius: 20,
  },
  newBadgeText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default function BookScreenWrapper() {
  return <BookStack />;
}

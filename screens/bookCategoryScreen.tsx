import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { sampleBooks } from "../sampleData";
import { useNavigation, useRoute } from "@react-navigation/native";

const BookCategoryScreen: React.FC = () => {
  const route = useRoute();
  const { category } = route.params;
  const filteredBooks = sampleBooks.filter(
    (book) => book.category === category
  );
  const navigation = useNavigation();

  const handleBookPress = (book) => {
    navigation.navigate("BookDetail", { book });
  };

  return (
    <View style={styles.container}>
      {filteredBooks.map((book) => (
        <TouchableOpacity
          key={book.title}
          onPress={() => handleBookPress(book)}
        >
          <View style={styles.bookContainer}>
            <Image source={book.image} style={styles.image} />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182F4A",
    justifyContent: "center",
    alignItems: "center",
  },
  bookContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "white",
  },
  author: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});

export default BookCategoryScreen;

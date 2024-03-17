import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { sampleBooks } from "../sampleData";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const BookCategoryScreen: React.FC = () => {
  const route = useRoute();
  const { category } = route.params;
  const filteredBooks = sampleBooks.filter((book) => book.category === category);
  const navigation = useNavigation();

  const handleBookPress = (book) => {
    navigation.navigate("BookDetail", { book });
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {filteredBooks.map((book) => (
        <TouchableOpacity key={book.title} onPress={() => handleBookPress(book)}>
          <View>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Image source={book.image} style={{ width: 80, height: 80 }} />
          </View>
        </TouchableOpacity>
      ))}
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

export default BookCategoryScreen;

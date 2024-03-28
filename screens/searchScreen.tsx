import React, { useState } from "react";
import { View, TextInput, ScrollView, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BookCategoryScreen from "./bookCategoryScreen";
import BookDetailScreen from "./bookDetailScreen";
import { sampleBooks } from "../sampleData";
import { hotStorys } from "../sampleData";

const Stack = createStackNavigator();

const CustomButton = ({ title, onPress }) => (
  <View style={styles.buttonContainer}>
    <Text style={styles.button} onPress={onPress}>
      {title}
    </Text>
  </View>
);

function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredBooks([]);
      return;
    }
    const filtered = sampleBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#2D466B" }}>
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          style={{
            height: 40,
            backgroundColor: "#DAE9FF",
            borderColor: "#000000",
            color: "black",
            borderWidth: 1,
            margin: 10,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
          placeholder="Search Books"
          placeholderTextColor="#000000"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <View style={{ marginHorizontal: 10 }}>
          {filteredBooks.map((book, index) => (
            <Text
              key={index}
              onPress={() => navigation.navigate("BookDetail", { book: book })}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                color: "white",
                borderColor: "#ccc",
              }}
            >
              {book.title}
            </Text>
          ))}
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFFFFF" }}>
            5 อันดับเรื่องที่มาแรง
          </Text>
          {hotStorys.map((story, index) => (
            <View key={index}>
              <Text
                onPress={() =>
                  navigation.navigate("BookDetail", { book: story })
                }
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  color: "#FFFFFF",
                }}
              >
                {story.title} - {story.popularity}
                {story.popularity === "High" && (
                  <Text style={{ color: "#1E90FF" }}>{`\u25B2`}</Text>
                )}
                {story.popularity === "Low" && (
                  <Text style={{ color: "#FF6347" }}>{`\u25BC`}</Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Text style={styles.categoryText}>ประเภท</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CustomButton
            title="โรแมนซ์แฟนตาซี"
            onPress={() =>
              navigation.navigate("RomanceFantasy", {
                category: "RomanceFantasy",
              })
            }
          />
          <CustomButton
            title="โรแมนซ์"
            onPress={() =>
              navigation.navigate("Romance", { category: "Romance" })
            }
          />
          <CustomButton
            title="ดราม่า"
            onPress={() => navigation.navigate("Drama", { category: "Drama" })}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <CustomButton
            title="แฟนตาซี"
            onPress={() =>
              navigation.navigate("Fantasy", { category: "Fantasy" })
            }
          />
          <CustomButton
            title="ระทึกขวัญ"
            onPress={() =>
              navigation.navigate("Thriller", { category: "Thriller" })
            }
          />
          <CustomButton
            title="แอคชั่น"
            onPress={() =>
              navigation.navigate("Action", { category: "Action" })
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#DAE9FF",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#191970",
    color: "#fff",
    textAlign: "center",
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 23,
    fontWeight: "bold",
    marginRight: 10,
    color: "#000033",
    marginLeft: 8,
    marginBottom: 8,
  },
});

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="search"
        component={SearchScreen}
      />
      <Stack.Screen
        name="RomanceFantasy"
        component={BookCategoryScreen}
        options={{ title: "Romance Fantasy" }}
      />
      <Stack.Screen
        name="Romance"
        component={BookCategoryScreen}
        options={{ title: "Romance" }}
      />
      <Stack.Screen
        name="Drama"
        component={BookCategoryScreen}
        options={{ title: "Drama" }}
      />
      <Stack.Screen
        name="Fantasy"
        component={BookCategoryScreen}
        options={{ title: "Fantasy" }}
      />
      <Stack.Screen
        name="Thriller"
        component={BookCategoryScreen}
        options={{ title: "Thriller" }}
      />
      <Stack.Screen
        name="Action"
        component={BookCategoryScreen}
        options={{ title: "Action" }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: "Book Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function SearchScreenWrapper() {
  return <SearchStack />;
}

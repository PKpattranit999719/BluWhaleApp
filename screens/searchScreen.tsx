import React, { useState } from "react";
import { View, TextInput, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BookCategoryScreen from "./bookCategoryScreen";
import BookDetailScreen from "./bookDetailScreen";
import { sampleBooks } from "../sampleData";
import Icon from "react-native-vector-icons/FontAwesome";

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
          {sampleBooks.slice(0, 5).map((book, index) => (
          <View key={index}>
            <Text
              onPress={() =>
                navigation.navigate("BookDetail", { book: book })
              }
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#ccc",
                color: "#FFFFFF",
              }}
            >
              {index+1} {book.title} - {book.popularity}
              {book.popularity === "High" && (
                <Text style={{ color: "#1E90FF" }}>{`\u25B2`}</Text>
              )}
              {book.popularity === "Low" && (
                <Text style={{ color: "#FF6347" }}>{`\u25BC`}</Text>
              )}
            </Text>
          </View>
        ))}
          <View>
          <Text style={{ marginTop: 20,fontSize: 20, fontWeight: "bold", color: "#FFFFFF" }}>
            รายการแนะนำ
          </Text>
          </View>
              <ScrollView horizontal style={styles.imageScrollView}>
          {sampleBooks.map((book, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("BookDetail", { book: book })}
              style={styles.bookImageWrapper}
            >
              <Image source={book.image} style={styles.bookImage} />
              <View>
                      {book.isUpdate === 1 && (
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
          ))}
        </ScrollView>
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
    backgroundColor: "#2D466B",
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
  imageScrollView: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bookImageWrapper: {
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  bookImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
  },
  updateBadge: {
    backgroundColor: "#2E8B57",
    borderRadius: 5,
  },
  updateBadgeText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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

import React from "react";
import { Button, Image, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BookCategoryScreen from "./bookCategoryScreen";
import BookDetailScreen from "./bookDetailScreen";

const Stack = createStackNavigator();

function SearchScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2D466B",
      }}
    >
      <Button
        title="โรแมนซ์แฟนตาซี"
        onPress={() =>
          navigation.navigate("RomanceFantasy", { category: "RomanceFantasy" })
        }
      />

      <Button
        title="โรแมนซ์"
        onPress={() => navigation.navigate("Romance", { category: "Romance" })}
      />

      <Button
        title="ดราม่า"
        onPress={() => navigation.navigate("Drama", { category: "Drama" })}
      />

      <Button
        title="แฟนตาซี"
        onPress={() => navigation.navigate("Fantasy", { category: "Fantasy" })}
      />

      <Button
        title="ระทึกขวัญ"
        onPress={() =>
          navigation.navigate("Thriller", { category: "Thriller" })
        }
      />

      <Button
        title="แอคชั่น"
        onPress={() => navigation.navigate("Action", { category: "Action" })}
      />
    </View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="search"
        component={SearchScreen}
      />
      <Stack.Screen name="RomanceFantasy" component={BookCategoryScreen} options={{ title: 'Romance Fantasy' }}/>
      <Stack.Screen name="Romance" component={BookCategoryScreen} options={{ title: 'Romance' }}/>
      <Stack.Screen name="Drama" component={BookCategoryScreen} options={{ title: 'Drama' }}/>
      <Stack.Screen name="Fantasy" component={BookCategoryScreen} options={{ title: 'Fantasy' }}/>
      <Stack.Screen name="Thriller" component={BookCategoryScreen} options={{ title: 'Thriller' }}/>
      <Stack.Screen name="Action" component={BookCategoryScreen} options={{ title: 'Action' }}/>
      <Stack.Screen 
        name="BookDetail" 
        component={BookDetailScreen} 
        options={{ title: 'Book Detail' }}
        />
    </Stack.Navigator>
  );
}

export default function SearchScreenWrapper() {
  return <MyStack />;
}


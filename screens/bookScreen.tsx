import React from "react";
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image} from "react-native";
import { sampleUsers } from "../sampleData";
import { useAuth } from "../authContext";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookDetailScreen from "./bookDetailScreen";

const Stack = createStackNavigator();

function BookStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Book"
        component={BookScreen}
      />
      <Stack.Screen 
        name="BookDetail" 
        component={BookDetailScreen} 
        options={{ title: 'Book Detail' }}
        />    
      </Stack.Navigator>
  );
}

const BookScreen: React.FC = () => {
  const { username, loggedIn } = useAuth();
  const navigation = useNavigation();
  const currentUser = sampleUsers.find((user) => user.username === username);

  const handleLoginPress = () => {
    if (!loggedIn) {
      navigation.navigate("Home");
    }
  };

  const handleBookPress = (book) => {
    navigation.navigate("BookDetail", { book });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2D466B" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        {username ? `${username}'s Books:` : "Please log in to view books"}
      </Text>
      {loggedIn ? (
        currentUser?.books && currentUser?.books.length > 0 ? ( 
          <FlatList
            data={currentUser.books} 
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.container} onPress={() => handleBookPress(item)}>
                <Text style={{ fontSize: 16, color: "white" }}>{item.title} by {item.author}</Text>
                <Image source={item.image} style={{ width: 80, height: 80 }} />
              </TouchableOpacity>
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


export default function SearchScreenWrapper() {
  return <BookStack/>;
}
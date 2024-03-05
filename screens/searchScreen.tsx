import React from "react";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../authContext";

const Stack = createStackNavigator();

function SearchScreen({ navigation }) {
  const { username } = useAuth(); 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2D466B",
      }}
    >
      <Text>Search!</Text>
      <Button
        title="โรแมนซ์แฟนตาซี"
        onPress={() => navigation.navigate("RomanceFantasy")}
      />

      <Button title="โรแมนซ์" onPress={() => navigation.navigate("Romance")} />

      <Button title="ดราม่า" onPress={() => navigation.navigate("Drama")} />

      <Button title="แฟนตาซี" onPress={() => navigation.navigate("Drama")} />

      <Button title="ระทึกขวัญ" onPress={() => navigation.navigate("Thriller")}/>

      <Button title="แอคชั่น" onPress={() => navigation.navigate("Action")}/>
    </View>
  );
}

function RomanceFantasy({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Romance({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Drama({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Fantasy({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Thriller({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function Action({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="search" component={SearchScreen} />
      <Stack.Screen name="RomanceFantasy" component={RomanceFantasy} />
      <Stack.Screen name="Romance" component={Romance} />
      <Stack.Screen name="Drama" component={Drama} />
      <Stack.Screen name="Fantasy" component={Fantasy} />
      <Stack.Screen name="Thriller" component={Thriller} />
      <Stack.Screen name="Action" component={Action} />
    </Stack.Navigator>
  );
}

export default function SearchScreenWrapper() {
  return <MyStack />;
}

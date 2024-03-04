import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D466B' }}>
      <Text>Search!</Text>
      <Button
        title="โรแมนซ์แฟนตาซี"
        onPress={() => navigation.navigate('RomanceFantasy')}
      />

      <Button
      title="โรแมนซ์"
      onPress={() => navigation.navigate('Romance')}
      />
    </View>
  );
}

function RomanceFantasy({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function Romance({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="RomanceFantasy" component={RomanceFantasy} />
      <Stack.Screen name="Romance" component={Romance} />
    </Stack.Navigator>
  );
}

export default function SearchScreenWrapper() {
  return (
    <MyStack />
  );
}

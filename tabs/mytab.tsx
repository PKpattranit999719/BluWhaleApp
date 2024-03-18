import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../authContext'; // Import useAuth hook

//Screen
import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import BookScreen from '../screens/bookScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    const { loggedIn, logout } = useAuth(); // Access loggedIn state and logout function from AuthContext

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('loggedInUserEmail');
            logout(); 
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerStyle:{
                    backgroundColor: '#FFFFFF'
                },
                headerTintColor:'#000000',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                tabBarActiveTintColor: '#191970',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({color}) => {
                    let iconName : "home" | "search" | "book" 
                    switch (route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "Search":
                            iconName = "search";
                            break;
                        case "Book":
                            iconName = "book";
                            break;
                    }
                    return <Ionicons name={iconName} color={color} size={25} />
                },
                headerRight: () => (
                    loggedIn && (
                        <TouchableOpacity onPress={handleLogout} style={{marginRight: 10}}>
                            <Ionicons name="log-out" color="black" size={25} />
                        </TouchableOpacity>
                    )
                )
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Book" component={BookScreen} />
        </Tab.Navigator>
    );
}

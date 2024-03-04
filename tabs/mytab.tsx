//Module
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//Screen
import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import BookScreen from '../screens/bookScreen';


const Tab = createBottomTabNavigator();

export default function MyTabs() {
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
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Book" component={BookScreen} />
        </Tab.Navigator>
    );
}
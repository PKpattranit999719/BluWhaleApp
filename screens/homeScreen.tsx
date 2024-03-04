import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import LoginScreen from './loginScreen';
import RegisterScreen from './registerScreen';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2D466B'}}>
            <Image source={require('../assets/bluWhale_LOGO.png')} style={{ width: 350, height: 350}} />
            <LoginScreen></LoginScreen>
            <RegisterScreen></RegisterScreen>
        </View>
    );
}


import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
// import { NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
    let logoutFuntion = () => {
        AsyncStorage.removeItem('user_name', 'user_email')

        navigation.replace('Auth', { screen: 'LoginScreen' });
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>Logout</Text>
            <TouchableOpacity style={{

                backgroundColor: 'skyblue', borderRadius: 15, flex: 0, padding: 20
            }} onPress={() => logoutFuntion()}>
                <Text style={{ color: '#000', fontSize: 25 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Logout
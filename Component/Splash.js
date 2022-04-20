import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Images } from '../Constant'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true)

    let Hide_Splash_Screen = () => {
        setIsVisible({
            isVisible: false
        });
    }

    useEffect(() => {
        setTimeout(function () {
            Hide_Splash_Screen();
            AsyncStorage.getItem('user_id').then((value) =>
                navigation.replace(
                    value === null ? 'Auth' : 'DrawerNav'
                ),
            );
        }, 3000);
    }, [])

    return (


        <View style={styles.SplashScreen_RootView}>
            <View style={styles.SplashScreen_ChildView}>
                <Image source={Images.splashImg} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{
                position: 'absolute', bottom: 50, alignSelf: 'center',
            }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>QuizeApp</Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },

        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
        },

        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2643B4',
            flex: 1,

        },
    });
export default Splash
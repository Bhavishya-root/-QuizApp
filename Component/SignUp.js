import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Images } from '../Constant'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput, HelperText } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const { height, width } = Dimensions.get('window')
const Signup = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPasssword] = useState()
    const [isActive, setIsActive] = useState(false)
    const [isFocus, setIsFocus] = useState(true)

    let handleFocus = () => setIsFocus(true)

    let handleBlur = () => setIsFocus(false)


    let regEmailExp = !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
    let regPassExp = !new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(password)

    const toastConfig = {

        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green', borderLeftWidth: 15 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 22,
                    fontWeight: '400', color: 'green',

                }}
                text2Style={{
                    fontSize: 17,
                    color: 'green',

                }}
            />
        ),

        error: (props) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: 'brown', borderLeftWidth: 15 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 22,
                    fontWeight: '400', color: 'brown'
                }}
                text2Style={{
                    fontSize: 17,
                    color: 'brown'
                }}
            />
        ),

    };



    let handleSubmit = () => {


        if (!userName) {
            alert('Please fill Email');
            return;
        }

        if (userName.length < 3) {
            alert('User name is too short');
            return;
        }

        if (!email) {
            alert('Please fill Email');
            return;
        }

        if (regEmailExp) {
            alert('Please fill Valid Email');
            return;
        }
        if (!password) {
            alert('Please fill password');
            return;
        }
        if (password.length < 5) {
            alert('Password is too short ');
            return;
        }
        let data = new FormData();
        data.append("username", userName);
        data.append("email", email);
        data.append("password", password);
        setIsActive(true)
        fetch('https://dicecoder.com/guest/api2/resgtration.php', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: '*',
                "Access-Control-Allow-Headers": "origin, content-type, accept"

            }
        })
            .then((res) => res.json())
            .then((data) => {
                setIsActive(false)
                if (data.response === 1) {
                    AsyncStorage.setItem('user_name', userName)
                    AsyncStorage.setItem('user_email', email)
                    Toast.show({
                        type: 'success',
                        text1: `Hello ${userName}👋`,
                        text2: data.msg
                    });

                    setTimeout(() => {
                        navigation.replace('DrawerNav')
                    }, 2000)

                } else {
                    Toast.show({
                        type: 'error',
                        text1: `Hello user`,
                        text2: data.msg
                    });
                }
            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Hello user 👋',
                    text2: error.msg
                });

            });



    }

    return (

        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}>
                <View>
                    <Image style={styles.logo} source={Images.splashImg} />

                </View>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10, color: '#fff' }}>QuizApp</Text>
            </View>

            <View style={styles.profileView}>
                <ScrollView>
                    <View>
                        <Text style={styles.Heading}>Register</Text>
                    </View>

                    <View style={{ marginTop: '4%', paddingHorizontal: '6%' }}>

                        <Text style={styles.lable}>Username</Text>

                        <TextInput style={[styles.textInputEmail, {
                            borderBottomColor: userName && userName.length < 3 ?
                                'brown' : null
                        }]} placeholder="Enter your name"
                            placeholderTextColor={'grey'} left={<TextInput.Icon size={20} name='account' />}
                            value={userName} onChangeText={(text) => setUserName(text)}
                        />
                        {
                            userName && userName.length < 3 ? <Text style={{ color: 'red' }}>User name at least 3 or more characters </Text>
                                :
                                <Text style={{ color: '#000' }}>{null}</Text>
                        }
                    </View>

                    <View style={{ marginTop: '4%', paddingHorizontal: '6%' }}>
                        <Text style={styles.lable}>Email</Text>
                        <TextInput style={styles.textInputEmail} placeholder="Enter your email id"
                            placeholderTextColor={'grey'} left={<TextInput.Icon size={20} name='email' />}
                            value={email} onChangeText={(text) => setEmail(text)}
                        />
                        {
                            regEmailExp && email && email.length > 0 ? <Text style={{ color: 'red' }}>invalid email adress!</Text>
                                :
                                <Text style={{ color: '#000' }}>{null}</Text>
                        }


                    </View>

                    <View style={{ marginTop: '4%', paddingHorizontal: '6%' }}>
                        <Text style={styles.lable}>Password</Text>

                        <TextInput style={styles.textInputPassword} placeholder="Enter your password"
                            placeholderTextColor={'grey'} secureTextEntry={passwordVisible}
                            left={<TextInput.Icon size={20} name='lock' />}
                            value={password} onChangeText={(text) => setPasssword(text)}
                        />
                        <Icon style={styles.icon} size={20} color='#000'
                            name={passwordVisible ? "eye-off" : "eye"}
                            onPress={() => { setPasswordVisible(!passwordVisible); return false }}
                        />
                        {
                            password && password.length < 5 ? <Text style={{ color: 'red' }}>Password at least 5 or more characters </Text>
                                :
                                <Text style={{ color: '#000' }}>{null}</Text>
                        }
                    </View>

                    <View>
                        <TouchableOpacity style={styles.signupBtn} onPress={() => handleSubmit()}>
                            <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#fff' }}>Sign-up</Text>
                        </TouchableOpacity>

                    </View>

                    <View >
                        <Text style={styles.loginAccountText} onPress={() => navigation.navigate('LoginScreen', { userName: userName })}>You have an already account ? Log-in</Text>
                    </View>

                </ScrollView>

            </View>
            {isActive && <View
                style={{
                    position: 'absolute', left: 0, right: 0, top: 0, bottom: 50, opacity: 10,
                    backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color='brown' animating={isActive} />
            </View>}
            <Toast config={toastConfig} />
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#2F7DCB',
        flex: 1,
    },
    logo: {
        height: 70,
        width: 70
    },

    profileView: {
        backgroundColor: '#fff',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        flex: 6,
        paddingVertical: '6%'
    },
    Heading: {
        fontSize: 30,
        color: "#000",
        fontWeight: '700',
        fontFamily: 'Source Serif Pro, serif',
        paddingHorizontal: '4%'
    },
    textInputEmail: {

        height: 35,
        color: '#000',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    textInputPassword: {

        height: 35,
        color: '#000',
        fontSize: 15,
        backgroundColor: 'transparent',

    },
    lable: {
        color: '#000',
        fontSize: 17,
        fontWeight: 'bold',
        paddingBottom: '1%'
    },
    forgotPasswordText: {
        color: '#2F7DCB',
        fontSize: 20,
        alignSelf: 'flex-end',
        fontFamily: 'Source Serif Pro, serif',
    },
    signupBtn: {
        // color: '#fff',
        backgroundColor: '#42a5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '15%',
        borderRadius: 25,
        padding: '3%',
        marginVertical: '6%'
    },
    icon: {
        position: 'absolute',
        top: 33,
        right: 35
    },
    loginAccountText: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

})

export default Signup
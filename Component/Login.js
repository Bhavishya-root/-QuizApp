import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Alert, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Images } from '../Constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';




const Login = ({ navigation, route }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = useState()
    const [password, setPasssword] = useState()
    const [isActive, setIsActive] = useState(false)
    // const [userName, setUserName] = useState()

    // AsyncStorage.getItem('user_name').then(value => {
    //     console.log(value)
    //     setUserName(value)
    // })



    let regEmailExp = !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
    const toastConfig = {

        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green', borderLeftWidth: 15 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 18,
                    fontWeight: '400', color: 'green',

                }}
                text2Style={{
                    fontSize: 15,
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
                    fontSize: 18,
                    fontWeight: '400', color: 'brown'
                }}
                text2Style={{
                    fontSize: 15,
                    color: 'brown'
                }}
            />
        ),

    };


    let handleSubmit = () => {
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
        data.append("email", email);
        data.append("password", password);

        setIsActive(true)

        fetch('https://dicecoder.com/guest/api2/login.php', {
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
                    Toast.show({
                        type: 'success',
                        text1: `Hello user👋`,
                        text2: data.msg
                    });
                    // AsyncStorage.setItem('user_id', responseJson.data.email);
                    setTimeout(() => {
                        navigation.replace('DrawerNav')
                    }, 1000)

                } else {
                    Toast.show({
                        type: 'error',
                        text1: `Hello user👋`,
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

            <View style={{ alignItems: 'center', flex: 4, justifyContent: 'center' }}>

                <View >
                    <Image style={styles.logo} source={Images.splashImg} />
                </View>

                <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10, color: '#fff' }}>QuizApp</Text>
            </View>

            <View style={styles.profileView}>
                <ScrollView>
                    <View>
                        <Text style={styles.Heading}>Login</Text>
                    </View>

                    <View style={{ marginTop: '4%', paddingHorizontal: '6%' }}>
                        <Text style={styles.lable}>Email</Text>
                        <TextInput style={styles.textInputEmail} placeholder="Enter your email id"
                            placeholderTextColor={'grey'} left={<TextInput.Icon size={20} name='account' />}
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
                            placeholderTextColor={'grey'} secureTextEntry={passwordVisible} left={<TextInput.Icon size={20} name='lock' />}
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

                        <TouchableOpacity style={styles.loginBtn} onPress={() => handleSubmit()} >

                            <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#fff', }}>Login</Text>
                        </TouchableOpacity>

                    </View>

                    <View >
                        <Text style={styles.loginAccountText} onPress={() => navigation.navigate('RegisterScreen')}>don't have an account ? Sign-up</Text>
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
        flex: 1
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
        fontSize: 18,
        alignSelf: 'flex-end',
        fontFamily: 'Source Serif Pro, serif',
        fontWeight: '600'
    },
    loginBtn: {

        backgroundColor: '#689f38',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '15%',
        borderRadius: 25,
        padding: '3%',
        marginVertical: '6%'
    },
    loginAccountText: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    icon: {
        position: 'absolute',
        top: 33,
        right: 35
    },
    loding: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default Login
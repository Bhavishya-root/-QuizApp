import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

import { Images } from '../Constant'
import Title from '../Component/Title'

const { height, width } = Dimensions.get('window')

const Home = ({ navigation }) => {


    const handelNextScreen = () => {
        navigation.navigate('Quiz')
    }


    return (
        <View style={styles.container}>
            <Title />
            <Animatable.View style={[styles.bannerContainer, styles.shadowProp]} easing={'ease-in-out'}
                animation="zoomIn" iterationCount={1} direction="alternate" >
                <Image source={Images.banner}
                    style={styles.banner} />

            </Animatable.View>

            <Animatable.View easing={'ease-in-out'}
                animation="pulse" iterationCount={'infinite'} direction="alternate">
                <TouchableOpacity style={styles.startButton} onPress={handelNextScreen} >
                    <Text style={styles.startText}>Start</Text>
                    <FontAwesome5 name='long-arrow-alt-right' solid size={25}
                        style={{ color: '#fff', paddingStart: 20 }} />
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4.5%',

    },
    banner: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    bannerContainer: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff1e6',
        marginTop: '10%',
        height: '50%',
        width: '100%'

    },
    startButton: {
        alignItems: 'center',
        borderWidth: 0,
        justifyContent: "center",
        backgroundColor: "#2643B4",
        paddingVertical: '3.8%',
        marginHorizontal: '27%',
        borderRadius: 10,
        marginTop: '15%',
        flexDirection: 'row',
        // width: width - 200,
        // height: height / 15

    },
    startText: {
        color: "#fff",
        fontSize: 23,
        fontWeight: "bold",
    },
    shadowProp: {
        elevation: 16,
        borderRadius: 20
    },
})

export default Home
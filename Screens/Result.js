import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Images } from '../Constant'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Result = ({ route, navigation }) => {


    const score = route.params ? route.params.score : 0
    const resultObj = route.params ? route.params.result : []
    const data = route.params ? route.params.data : []
    let questionData = [...data]

    let notSelectquestion = !questionData.length ? resultObj : questionData.filter(ele => {
        return !resultObj.find(item => {
            return item.question === decodeURIComponent(ele.question)
        })
    })

    let notSelectquestionArr = [...notSelectquestion]

    const resultObjArr = [...resultObj]

    !notSelectquestionArr.length ? resultObj : notSelectquestionArr.map(item => {
        if (item !== -1) {
            resultObjArr.push({ question: decodeURIComponent(item.question), correctAnswer: decodeURIComponent(item.correct_answer) })
        }
    })


    return (

        <View style={styles.container}>
            <View style={styles.scoreView}>

                <ImageBackground source={Images.resultBackgroundBaner} resizeMode="cover"
                    style={{
                        flex: 1, width: '100%',
                        alignItems: 'center', height: '100%', marginTop: 15,
                    }} imageStyle={{ borderRadius: 16 }}>
                    <Text style={styles.scoreText}>Your final Score is </Text>
                    <View style={[styles.resultScoreTextDigit, styles.shadowProp]}>
                        <Text style={{ fontSize: 40, color: '#000', fontWeight: 'bold' }}>{score}</Text>
                    </View>
                </ImageBackground>
            </View>

            <View>
                <TouchableOpacity style={styles.goToAnswerKeyBtn} onPress={() => navigation.navigate('AnswerKey', {
                    score: score,
                    resultObj: resultObjArr,

                })}>
                    <Text style={styles.btnText}>Go to AnswerKey</Text>
                    <FontAwesome5 name='long-arrow-alt-right' solid size={25}
                        style={{ color: '#fff', paddingStart: 20 }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
        flex: 1
    },
    scoreView: {

        flex: 0.8,
        backgroundColor: '#5885AF',
        marginTop: 20,
        borderRadius: 15,
        height: '50%',
        width: '100%'

    },
    scoreText: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#fff'

    },
    goToAnswerKeyBtn: {
        backgroundColor: '#5885AF',
        padding: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        borderRadius: 10,
        marginHorizontal: '15%',
        flexDirection: 'row'
    },
    btnText: {
        color: '#fff',
        fontSize: 23,
    },
    resultScoreTextDigit: {
        backgroundColor: '#F5C352',
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: 100,
        width: 100,

    },
    shadowProp: {
        elevation: 16
    },
})
export default Result
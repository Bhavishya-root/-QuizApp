import { View, Text, FlatList, StyleSheet, TouchableOpacity, SectionList, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const AnswerKey = ({ navigation, route }) => {

    const resultObj = route.params ? route.params.resultObj : []
    const resultArr = [...resultObj]
    let notSelectAnswer = "you didn't select answer"

    let alertFun = () => {
        Alert.alert(
            'Go to quiz',
            'Please play the Quiz game first',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.reset({
                            // index: 2,
                            routes: [{ name: 'Quiz' }]
                        })
                    }
                }
            ]
        )
    }

    const Item = ({ question, correctAnswer, answer, index }) => (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.question}>Q.</Text>
                <Text style={{ color: '#444', fontSize: 22, lineHeight: 30, paddingRight: 25 }}> {question} </Text>
            </View>

            <View style={{ flexDirection: 'column', padding: 5, marginVertical: 10, }}>
                <Text style={styles.correctAnswer}>Correct Answer : {correctAnswer}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, flex: 1 }}>
                    <Text style={[correctAnswer === answer ? styles.correctAnswer : styles.IncorrectAnswer,
                    !answer ? styles.notSelectedAnswer : null]}>Your  Answer : {answer ? answer : notSelectAnswer}</Text>
                    {
                        correctAnswer === answer && answer ? <Icon name={'check'} size={20} color={'#9cc5a1'} /> : null
                    }

                </View>


            </View>

        </View>
    );


    const renderItem = ({ item, index }) => {
        return (

            <Item
                index={index}
                question={item.question}
                correctAnswer={item.correctAnswer}
                answer={item.answer}
            />
        )

    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 9 }}>
                {
                    resultArr.length ? <FlatList data={resultArr} renderItem={renderItem} /> :
                        alertFun()
                }
            </View>

            <View style={{ marginVertical: '3%', flex: 0.8 }}>
                <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })}>

                    <Text style={styles.btnText}>Go to Home</Text>
                </TouchableOpacity>
            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3%',
        paddingVertical: '4%',
        borderBottomWidth: 1,

    },
    question: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        borderRadius: 15,
        // paddingHorizontal: '2%',

    },
    correctAnswer: {

        fontSize: 20,
        color: '#9cc5a1',
        fontWeight: 'bold'
    },
    IncorrectAnswer: {
        color: '#ec9192',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    homeBtn: {
        backgroundColor: '#9cc5a1',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 100,
        borderRadius: 10,
        padding: '3%',
        // marginTop: 20
    },
    notSelectedAnswer: {
        color: 'skyblue',
        fontWeight: 'bold'
    }
})
export default AnswerKey
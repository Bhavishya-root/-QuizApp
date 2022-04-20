import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import instance from '../Instance';
import { useFocusEffect, } from '@react-navigation/native';
import { NavigationEvents } from 'react-navigation';
import { useIsFocused } from '@react-navigation/native';
import { color, event } from 'react-native-reanimated';


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const Quiz = ({ navigation }) => {
    const [questions, setQuestions] = useState()
    const [ques, setQues] = useState(0)
    const [options, setOptions] = useState([])
    const [seletedAnswer, setSeletedAnswer] = useState([])
    const [notSelectedQuestion, setNotSelectedQuestion] = useState([])
    const [newCurrentAnswer, setNewCurrentAnswer] = useState([])


    const getQuestions = async () => {
        await instance.get('api.php?amount=10&type=multiple&encode=url3986').then(res => {
            const data = res.data
            setQuestions(data.results)
            setOptions(shuffleArrayAndAnswer(data.results[0]))

        }).catch(err => {
            console.log(err)
        })

    }

    useEffect(() => {

        getQuestions()


    }, [])

    const shuffleArrayAndAnswer = (_techQuestion) => {
        const option = [..._techQuestion.incorrect_answers]
        option.push(_techQuestion.correct_answer)
        let newOption = option.map(item => decodeURIComponent(item))
        shuffleArray(newOption)

        return newOption;


    }

    const handelNextButton = () => {

        setQues(ques + 1)
        setOptions(shuffleArrayAndAnswer(questions[ques + 1]))
    }

    const handelBackButton = () => {
        setQues(ques - 1)
        setOptions(shuffleArrayAndAnswer(questions[ques - 1]))
    }

    const handelCorrectAnswer = (_option) => {

        let counter = 0

        let selectedAnsArr = [...seletedAnswer]

        if (decodeURIComponent(questions[ques].correct_answer) === _option) {

            counter = 10
        }

        let ansReturnObj = selectedAnsArr.filter(item => item.question !== questions[ques].question)

        ansReturnObj.push({
            answer: decodeURIComponent(_option),
            question: decodeURIComponent(questions[ques].question),
            correctAnswer: decodeURIComponent(questions[ques].correct_answer),
            marks: counter
        })
        setSeletedAnswer(ansReturnObj)

        if (ques !== 9) {
            setQues(ques + 1)
            setOptions(shuffleArrayAndAnswer(questions[ques + 1]))

        }

    }

    const handelResultScreen = () => {

        let score = 0

        seletedAnswer.map(ele => {
            score = ele.marks + score

            return (ele)
        })
        navigation.navigate('Result', {
            score: score,
            result: seletedAnswer,
            data: questions,

        })

    }

    const renderAnswers = () => {
        let currentAnswer = '';

        seletedAnswer.map(item => {
            if (decodeURIComponent(item.question) === decodeURIComponent(questions[ques].question)
                && options.indexOf(item.answer) !== -1) {
                let index = options.indexOf(item.answer)

                currentAnswer = options[index]
            }
            return item
        });

        const returnObj = options.map((item, index) => {

            return (
                <TouchableOpacity
                    style={
                        [
                            styles.opacityButton,
                            currentAnswer === item ? styles.opacityCheckedButton : {}
                        ]
                    }
                    key={index} onPress={() => handelCorrectAnswer(item)}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[
                                styles.answerText,
                                currentAnswer === item ? styles.colorChanged : null
                            ]}>{item}</Text>
                        </View>
                        {
                            currentAnswer === item ? <Icon name={'check'} color='#fff' size={15} /> : null
                        }

                    </View>

                </TouchableOpacity>
            )

        })
        return returnObj;
    }
    return (

        <View style={styles.container}>
            {
                questions ?
                    questions && (
                        <>
                            <View style={{ flex: 8 }}>
                                <View >

                                    <Text style={styles.questionText}>Q.{ques + 1} {' '} {decodeURIComponent(questions[ques].question)} </Text>
                                </View>
                                <View >
                                    {
                                        renderAnswers()
                                    }

                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row', flex: 2,
                                position: 'absolute', bottom: '30%', left: '6%', right: '6%', justifyContent: "space-between",
                            }}>

                                {
                                    (ques > 0) ?
                                        <TouchableOpacity onPress={handelBackButton} style={styles.backButton}>
                                            <Text style={styles.backButtonText}>Back</Text>

                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.backButton}>
                                            <Text style={styles.backButtonText}>Back</Text>

                                        </TouchableOpacity>
                                }

                                {
                                    (ques !== 9) ?
                                        <TouchableOpacity onPress={handelNextButton} style={styles.nextButton}>
                                            <Text style={styles.nextButtonText}>Next</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity onPress={handelResultScreen} style={styles.resultButton}>
                                            <Text style={styles.resultButtonText}>Result</Text>
                                        </TouchableOpacity>
                                }

                            </View>
                        </>
                    ) :
                    <ActivityIndicator size={'large'} color='brown' />
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
        paddingVertical: '7%',
        flex: 1
    },
    questionText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#5885AF',
        color: '#fff',
        padding: '4%',
        borderRadius: 10
    },
    opacityButton: {
        marginVertical: '4%',
        borderRadius: 12,
        backgroundColor: '#C3E0E5',
        padding: '4%',
    },
    opacityCheckedButton: {

        backgroundColor: '#66bb6a',

    },
    answerText: {
        fontSize: 15,
        color: '#000',
        fontWeight: '800',


    },
    // correctAnswerText: {
    //     fontSize: 15,
    //     color: '#000',
    //     fontWeight: '800',
    //     marginVertical: 13,
    //     borderRadius: 12,
    //     backgroundColor: 'green',
    //     padding: 13,

    // },
    backButton: {
        marginTop: '19%',
        backgroundColor: '#5885AF',
        borderRadius: 10,
        paddingVertical: '3.2%',
        paddingHorizontal: '7%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',

    },
    nextButton: {
        marginTop: '19%',
        backgroundColor: '#274472',
        borderRadius: 10,
        paddingVertical: '3.2%',
        paddingHorizontal: '7%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800'
    },
    resultButton: {
        marginTop: '19%',
        backgroundColor: '#66bb6a',
        borderRadius: 10,
        paddingVertical: '3.2%',
        paddingHorizontal: '7%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800'
    },
    colorChanged: {
        color: '#fff'
    }

})
export default Quiz
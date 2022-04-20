import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Title = () => {
    return (
        <View>
            <Text style={styles.textTitle}>Quizapp</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 32,
        color: "blue",
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15
    }
})

export default Title
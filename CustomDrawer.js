import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Images } from './Constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const CustomDrawer = (props) => {
    const [selectedId, setSelectedId] = useState(null)
    const [getValue, setGetValue] = useState()
    console.log(getValue)
    let screensArr = [
        { icon: "home", title: "Home" },
        { icon: "pencil", title: "Quiz" },
        { icon: "poll", title: "Result" },
        { icon: "key", title: "Answer-key" },
        { icon: "logout", title: "Log-out" },
    ]


    const Item = ({ title, icon, index, onPress, backgroundColor, color, borderRadius }) => (
        <TouchableOpacity onPress={() => onPress(index)}>
            <View style={[styles.renderItemView, { backgroundColor: backgroundColor }, { borderRadius: borderRadius }]}>

                <Icon name={icon} solid size={18} style={[{ color: color }]} />
                <Text style={[styles.flatListItemText, { color: color }]}>{title}</Text>

            </View>
        </TouchableOpacity >
    )



    const renderItem = ({ item, index }) => {
        const backgroundColor = index === selectedId ? "#2643B4" : '#fff';
        const color = index === selectedId ? 'white' : '#616161';
        const borderRadius = index === selectedId ? 10 : 0
        return (

            <Item onPress={(index) => {
                setSelectedId(index)
                if (item?.title === 'Log-out') {
                    Alert.alert(

                        "Are you sure want to Logout?",
                        "Please press ok to Logout",

                        [
                            {
                                text: "Cancel",
                                onPress: () => { },

                            },
                            {
                                text: "OK", onPress: () => props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Auth' }]
                                })
                            }
                        ]
                    );

                } else {
                    props.navigation.navigate(props?.state?.routes[index]);
                }

            }}

                title={item.title}
                index={index}
                icon={item.icon} backgroundColor={backgroundColor} color={color}
                borderRadius={borderRadius}
            />
        );
    };

    function capitalizeFirstLetter(str) {

        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return capitalized;
    }
    AsyncStorage.getItem('user_name').then(value => {
        let result = capitalizeFirstLetter(value)
        setGetValue(result)
    })

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#845EC2', '#2643B4']} style={styles.linearGradient}>
                <View style={styles.imgView}>
                    <Image style={styles.userImg} source={Images.userImg} />
                    <View style={styles.userImgText}>
                        <Text style={{ color: "#fff", fontSize: 22, fontWeight: 'bold' }}>Welcome!</Text>
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold' }}>{getValue}</Text>

                    </View>


                </View>
            </LinearGradient>

            <View style={styles.screensView}>
                <FlatList data={screensArr} renderItem={renderItem}>

                </FlatList>

            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '4%',
        paddingTop: '4%',
        flex: 1
    },
    imgView: {


        paddingLeft: '4%',
        flex: 1,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start'

    },
    userImg: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        borderColor: "#fff",
        backgroundColor: '#fff'

    },
    userImgText: {
        color: "#fff",
        fontSize: 22,
        // paddingTop: 10,
        fontWeight: "bold",
        paddingLeft: '6%'

    },
    screensView: {
        flex: 1,
        // backgroundColor: '#e8f5e9',
        marginTop: '1%',
        borderRadius: 10,


    },
    flatListItemText: {
        // color: "#000",
        fontSize: 20,
        paddingLeft: '6%',
        fontWeight: 'bold',

    },
    renderItemView: {
        flexDirection: 'row',
        paddingVertical: '4%',
        paddingHorizontal: 35,
        alignItems: 'center',
        marginTop: '5%'
    },
    linearGradient: {
        flex: 0.17,
        borderRadius: 5
    },

})
export default CustomDrawer
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Modal, Button } from 'react-native'
import { Icon } from 'react-native-elements'
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Component that allows the daily mood to be chosen
const MoodPicker = (props) => {
    const goodCountPress = () => {
        props.showMoodModal(false)
        props.setGoodCount(props.goodCount+1)
        props.setMoodIcon('smile-circle')
        props.setMoodColor('#058ED9')
        saveGoodMood()
    }
    const averageCountPress = () => {
        props.showMoodModal(false)
        props.setAverageCount(props.averageCount+1)
        props.setMoodIcon('meho')
        props.setMoodColor("#848FA2")
        saveAverageMood()
    }
    const badCountPress = () => {
        props.showMoodModal(false)
        props.setBadCount(props.badCount+1)
        props.setMoodIcon('frown')
        props.setMoodColor("#CC2D35")

        saveBadMood()
    }
    const saveGoodMood = async () => {
        try {
            await AsyncStorage.setItem('good',JSON.stringify(props.goodCount+1))
        } catch (err) {
          alert(err)
        }
    }
    const saveAverageMood = async () => {
        try {
            await AsyncStorage.setItem('average',JSON.stringify(props.averageCount+1))
        } catch (err) {
          alert(err)
        }
    }
    const saveBadMood = async () => {
        try {
            await AsyncStorage.setItem('bad',JSON.stringify(props.badCount+1))
        } catch (err) {
          alert(err)
        }
    }

    const loadGoodMood = async () => {
        try {
            let savedGoodCount = await AsyncStorage.getItem('good')
            if (savedGoodCount !== null) {
                props.setGoodCount(Number(savedGoodCount))
            }
        } catch (err) {
          console.log(err)
        }
    }
    const loadAverageMood = async () => {
        try {
            let savedAverageCount = await AsyncStorage.getItem('average')
            if (savedAverageCount !== null) {
                props.setAverageCount(Number(savedAverageCount))
            }
        } catch (err) {
          console.log(err)
        }
    }
    const loadBadMood = async () => {
        try {
            let savedBadCount = await AsyncStorage.getItem('bad')
            if (savedBadCount !== null) {
                props.setBadCount(Number(savedBadCount))
            }
        } catch (err) {
          console.log(err)
        }
    }
    const clearAsyncStorage = async() => {
        AsyncStorage.clear();
        props.setGoodCount(0)
        props.setAverageCount(0)
        props.setBadCount(0)
        props.showMoodModal(false)
        props.setMoodColor('grey')
        props.setMoodIcon('rest')
    }

    useEffect(() =>{
        loadGoodMood()
        loadAverageMood()
        loadBadMood()
    }), []

    return (
        <View style={styles.container}>
        <Modal 
            style={styles.modalStyle}
            visible={props.visible} 
            animationType={'slide'}
        >
            <View style={styles.moodModalHeader}>
            <Ionicons 
                name="close" 
                size={40} 
                color="darkgrey" 
                onPress={() => {props.showMoodModal(false)}}
            />
            </View>
            <View style={styles.moodModalContent}>
            <Text style={{fontSize: 20}}>How do you feel today? </Text>
            <MaterialIcons 
                name="mood" size={30} color="purple" />
            </View>
            <View style={styles.moodModalContent}>
            <AntDesign 
                name="smile-circle" size={70} color="#058ED9" onPress={() => {goodCountPress()}} />
            </View>
            <View style={styles.moodModalContent}>
            <AntDesign 
                name="meho" size={70} color="#848FA2" onPress={() => {averageCountPress()}} />
            </View>
            <View style={styles.moodModalContent}>
            <AntDesign 
                name="frown" size={70} color="#CC2D35" onPress={() => {badCountPress()}} />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => {clearAsyncStorage()}}>
                    <Text style={{color: 'white'}}>Clear Mood Data</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000080'
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 20,
        backgroundColor: '#00000080'
    },
    moodModalHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 30,
        backgroundColor: '#fff', 
        padding: 20
    },
    moodModalContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff', 
        padding: 5
    },
    moodModalFaces: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#575DD9',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingVertical: 6,
        paddingHorizontal: 22,
        marginTop: 30,
        marginBottom: 40,
        marginHorizontal: 90,
        borderRadius: 6,
        }
})

export default MoodPicker

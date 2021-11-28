import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Modal } from 'react-native'
import { Icon } from 'react-native-elements'
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons'

// Component that allows the daily mood to be chosen
const MoodPicker = (props) => {
    const goodCountPress = () => {
        {props.showMoodModal(false)}
        {props.setGoodCount(props.goodCount+1)}
    }
    const averageCountPress = () => {
        {props.showMoodModal(false)}
        {props.setAverageCount(props.averageCount+1)}
    }
    const badCountPress = () => {
        {props.showMoodModal(false)}
        {props.setBadCount(props.badCount+1)}
    }

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
        padding: 20
      },
      moodModalFaces: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
})

export default MoodPicker

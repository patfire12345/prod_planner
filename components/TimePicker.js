import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

const TimePicker = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setOpen(true)
        }}>
        <Text>{props.text}</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={open}
        mode="time"
        onConfirm={(time) => {
          setOpen(false)
          props.setTime(time)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
})

export default TimePicker

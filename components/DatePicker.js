import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

const DatePicker = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setOpen(true)
        }}>
        <Text>Date</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={open}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          props.setDate(date)
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

export default DatePicker

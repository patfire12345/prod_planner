import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

// Component that allows specifically the Date to be chosen
const DatePicker = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setOpen(true)
        }}>
        <Text style={styles.selectedText}>
          {props.year}-{props.month}-{props.day}
        </Text>
        <Text style={styles.buttonText}>Date</Text>
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
    backgroundColor: 'transparent',
    width: 250,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonText: {
    position: 'absolute',
    color: 'grey',
    top: 40,
  },
  selectedText: {
    color: 'black',
    fontWeight: 'bold',
  },
})

export default DatePicker

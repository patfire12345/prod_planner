import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Modal } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import { Icon } from 'react-native-elements'

// Component that allows the color to be chosen
const ColorPickerWheel = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={{ ...styles.button, ...{ backgroundColor: props.color } }}
        onPress={() => {
          setOpen(true)
        }}>
        <View style={{ backgroundColor: props.color }}>
          <Text>{props.color}</Text>
        </View>
        <Text style={styles.buttonText}>Color</Text>
      </TouchableOpacity>
      <Modal visible={open}>
        <TouchableOpacity
          style={{ margin: 10, padding: 10 }}
          onPress={() => setOpen(false)}>
          <Icon name="arrow-left" type="evilicon" size={50} />
        </TouchableOpacity>
        <ColorPicker
          defaultColor={props.color}
          onColorSelected={(colorSelected) => {
            props.setColor(colorSelected)
            props.setChoseColor(true)
            setOpen(false)
          }}
          style={{ flex: 1 }}
        />
      </Modal>
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

export default ColorPickerWheel

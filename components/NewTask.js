import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'

const NewTask = (props) => {
  const [title, setTitle] = useState('')
  const [taskType, setTaskType] = useState('Other')
  return (
    <View style={{ display: 'flex' }}>
      <Modal visible={props.visible}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              props.showNewTaskModal()
              setTitle('')
              setTaskType('Other')
            }}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={{ textAlign: 'center' }}>Add Title:</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={(newTitle) => setTitle(newTitle)}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.typeButtonContainer}>
          <TouchableOpacity
            style={
              taskType == 'School'
                ? styles.typeButtonSelected
                : styles.typeButtonUnselected
            }
            onPress={() => setTaskType('School')}>
            <Text>School</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              taskType == 'Other'
                ? styles.typeButtonSelected
                : styles.typeButtonUnselected
            }
            onPress={() => {
              setTaskType('Other')
            }}>
            <Text>Other</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Submit"
          onPress={() => {
            props.addToTaskList({ title: title, category: taskType })
            props.showNewTaskModal()
            setTitle('')
            setTaskType('Other')
          }}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    borderRadius: 100,
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeButtonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeButtonUnselected: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#2196F3',
    width: 100,
    height: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default NewTask

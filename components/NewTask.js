import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'

const NewTask = (props) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [duration, setDuration] = useState(0)
  const [taskType, setTaskType] = useState('Other')
  return (
    <View style={{ display: 'flex' }}>
      <Modal visible={props.visible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TextInput
              style={styles.textInput}
              value={title}
              placeholder="Title of Event"
              onChangeText={(newTitle) => setTitle(newTitle)}
            />
          </View>
        </TouchableWithoutFeedback>
        <DatePicker setDate={setDate} />
        <TimePicker text="Time" setTime={setTime} />
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.showNewTaskModal()
              setTitle('')
              setTaskType('Other')
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
              ) {
                props.addToTaskList({ title: title, category: taskType })
              }

              props.addToWeeklyEventsList({
                start: `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()} ${
                  time.getHours() < 10 ? 0 : ''
                }${time.getHours()}:${
                  time.getMinutes() < 10 ? 0 : ''
                }${time.getMinutes()}:00`,
                duration: '00:20:00',
                note: title,
              })

              const dateWithoutTime = `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`

              props.addToMarkedDates({
                [dateWithoutTime]: {
                  periods: [
                    { startingDay: true, endingDay: true, color: 'blue' },
                  ],
                },
              })

              props.showNewTaskModal()
              setTitle('')
              setTaskType('Other')
            }}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
})

export default NewTask

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
import Dropdown from './Dropdown'
import TimePicker from './TimePicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ColorPickerWheel from './ColorPickerWheel'

// Modal that creates a new task for the users
const NewTask = (props) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [fullDate, setFullDate] = useState(new Date())
  const [duration, setDuration] = useState(0)
  const [color, setColor] = useState('#ffffff')

  const [choseDuration, setChoseDuration] = useState(false)
  const [choseColor, setChoseColor] = useState(false)

  const createDate = (dateObj, timeObj) => {
    fullDate.setFullYear(dateObj.getFullYear())
    fullDate.setMonth(dateObj.getMonth())
    fullDate.setDate(dateObj.getDate())

    fullDate.setHours(timeObj.getHours())
    fullDate.setMinutes(timeObj.getMinutes())
    fullDate.setSeconds(0)
  }

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key.toString(), jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={{ backgroundColor: "lightblue" }}>
      <Modal visible={props.visible}>
        <Text style={styles.sectionTitle}> Add New Task </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={title}
              placeholder="Title of Event"
              onChangeText={(newTitle) => setTitle(newTitle)}
            />
          </View>
        </TouchableWithoutFeedback>

        <DatePicker
          year={date.getFullYear()}
          month={date.getMonth() + 1}
          day={date.getDate()}
          setDate={setDate}
        />
        <TimePicker
          hour={time.getHours()}
          minute={
            time.getMinutes() < 10
              ? `0${time.getMinutes()}`
              : `${time.getMinutes()}`
          }
          text="Time"
          setTime={setTime}
        />

        <Dropdown
          data={[0.5, 1, 1.5, 2, 2.5, 3]}
          set={setDuration}
          changeFlag={setChoseDuration}
          defaultButtonText="Duration (Hours)"
          buttonStyle={{
            backgroundColor: 'transparent',
            width: 250,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            padding: 10,
          }}
          buttonText={{
            position: 'absolute',
            color: 'grey',
            fontSize: 14,
            top: 25,
            left: -190,
          }}
          isColor={false}
        />

        <ColorPickerWheel
          color={color}
          setColor={setColor}
          setChoseColor={setChoseColor}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.showNewTaskModal()
              setTitle('')
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!choseDuration || !choseColor}
            style={
              !choseDuration || !choseColor
                ? styles.buttonDisabled
                : styles.button
            }
            onPress={() => {
              if (
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
              ) {
                props.addToTaskList({
                  title: title,
                  category: `${duration} hours`,
                })
              }

              props.addToWeeklyEventsList([
                {
                  start: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''
                    }${date.getMonth() + 1}-${date.getDate() < 10 ? 0 : ''
                    }${date.getDate()} ${time.getHours() < 10 ? 0 : ''
                    }${time.getHours()}:${time.getMinutes() < 10 ? 0 : ''
                    }${time.getMinutes()}:00`,
                  duration: `${Math.floor(duration) < 10
                    ? `${0}${Math.floor(duration)}`
                    : Math.floor(duration)
                    }:${(duration * 60) % 60 === 0 ? '00' : (duration * 60) % 60
                    }:00`,
                  note: title,
                },
                {
                  start: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''
                    }${date.getMonth() + 1}-${date.getDate() - 1 < 10 ? 0 : ''}${date.getDate() - 1
                    } ${time.getHours() < 10 ? 0 : ''}${time.getHours()}:${time.getMinutes() < 10 ? 0 : ''
                    }${time.getMinutes()}:00`,
                  duration: `${Math.floor(duration) < 10
                    ? `${0}${Math.floor(duration)}`
                    : Math.floor(duration)
                    }:${(duration * 60) % 60 === 0 ? '00' : (duration * 60) % 60
                    }:00`,
                  note: `Reminder: ${title}`,
                },
                {
                  start: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''
                    }${date.getMonth() + 1}-${date.getDate() - 3 < 10 ? 0 : ''}${date.getDate() - 3
                    } ${time.getHours() < 10 ? 0 : ''}${time.getHours()}:${time.getMinutes() < 10 ? 0 : ''
                    }${time.getMinutes()}:00`,
                  duration: `${Math.floor(duration) < 10
                    ? `${0}${Math.floor(duration)}`
                    : Math.floor(duration)
                    }:${(duration * 60) % 60 === 0 ? '00' : (duration * 60) % 60
                    }:00`,
                  note: `Reminder: ${title}`,
                },
              ])

              const dateWithoutTime = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''
                }${date.getMonth() + 1}-${date.getDate() < 10 ? 0 : ''
                }${date.getDate()}`

              const reminderDate1 = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''
                }${date.getMonth() + 1}-${date.getDate() - 1 < 10 ? 0 : ''}${date.getDate() - 1
                }`

              const reminderDate2 = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''
                }${date.getMonth() + 1}-${date.getDate() - 3 < 10 ? 0 : ''}${date.getDate() - 3
                }`

              props.addToMarkedDates(
                {
                  [dateWithoutTime]: {
                    periods: [
                      { startingDay: true, endingDay: true, color: color },
                    ],
                  },
                },
                dateWithoutTime,
                color
              )

              props.addToMarkedDates(
                {
                  [reminderDate1]: {
                    periods: [
                      { startingDay: true, endingDay: true, color: color },
                    ],
                  },
                },
                reminderDate1,
                color
              )

              props.addToMarkedDates(
                {
                  [reminderDate2]: {
                    periods: [
                      { startingDay: true, endingDay: true, color: color },
                    ],
                  },
                },
                reminderDate2,
                color
              )

              createDate(date, time)
              storeData(fullDate, {
                date: fullDate,
                stringDate: dateWithoutTime,
                title: title,
                duration: duration,
                color: color,
                periods: [{ startingDay: true, endingDay: true, color: color }],
              })

              date.setDate(date.getDate() - 1)
              createDate(date, time)
              storeData(fullDate, {
                date: fullDate,
                stringDate: reminderDate1,
                title: title,
                duration: duration,
                color: color,
                periods: [{ startingDay: true, endingDay: true, color: color }],
              })

              date.setDate(date.getDate() - 3)
              createDate(date, time)
              storeData(fullDate, {
                date: fullDate,
                stringDate: reminderDate2,
                title: title,
                duration: duration,
                color: color,
                periods: [{ startingDay: true, endingDay: true, color: color }],
              })

              props.showNewTaskModal()
              setTitle('')
              setDate(new Date())
              setTime(new Date())
              setChoseColor(false)
              setChoseDuration(false)
              setDuration(0)
              storeData()
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
    backgroundColor: '#00BFFF',
    width: 60,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
    fontFamily: "Monaco",
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
    width: 60,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
    fontFamily: "Monaco",
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 20,
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 20,
    borderBottomWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
})

export default NewTask

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
  Alert,
} from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import DatePicker from './DatePicker'
import Dropdown from './Dropdown'
import TimePicker from './TimePicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ColorPickerWheel from './ColorPickerWheel'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})
// Modal that creates a new task for the users
const NewTask = (props) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [fullDate, setFullDate] = useState(new Date())
  const [duration, setDuration] = useState(0)
  const [color, setColor] = useState('#ffffff')

  const [reminderTime, setReminderTime] = useState('At time of event')
  const [body, setBody] = useState('in your reminders')
  const [reminder, setReminder] = useState(false)
  const [triggerTime, setTriggerTime] = useState(0)

  const [choseDuration, setChoseDuration] = useState(false)
  const [choseColor, setChoseColor] = useState(false)

  const trigger = new Date()
  const dateYear = date.getFullYear()
  const dateMonth = date.getMonth()
  const dateDay = date.getDate()
  const timeHr = time.getHours()
  const timeMin = time.getMinutes()

  const triggerButton = (reminderTime) => {
    setTriggerTime(2)
    switch (reminderTime) {
      case "At time of event":
        setBody('right now!')
      case "15 min before":
        setBody('in 15 min!')
        trigger.setMinutes(timeMin-15)
        break
      case "30 min before":
        trigger.setMinutes(timeMin-30)
        setBody('in 30 min!')
        break
      case "1 hour before":
        trigger.setMinutes(timeMin-60)
        setBody('in 1 hour!')
        break
      case "2 hours before":
        trigger.setMinutes(timeMin-120)
        setBody('in 2 hours!')
        break
      case "1 day before":
        trigger.setDate(dateDay-1)
        setBody('is tomorrow!')
        break
      case "2 days before":
        trigger.setDate(dateDay-2)
        setBody('in 2 days!')
        break
      default:
        setBody('in your reminders!')
    }
  }
  const triggerTimer = (reminderTime) => {
    trigger.setFullYear(dateYear)
    trigger.setMonth(dateMonth)
    trigger.setDate(dateDay)
    trigger.setHours(timeHr)
    trigger.setMinutes(timeMin)
    trigger.setSeconds(trigger.getSeconds()+5)
    switch (reminderTime) {
      case "At time of event":
        setBody('right now!')
      case "15 min before":
        setBody('in 15 min!')
        trigger.setMinutes(timeMin-15)
        break
      case "30 min before":
        trigger.setMinutes(timeMin-30)
        setBody('in 30 min!')
        break
      case "1 hour before":
        trigger.setMinutes(timeMin-60)
        setBody('in 1 hour!')
        break
      case "2 hours before":
        trigger.setMinutes(timeMin-120)
        setBody('in 2 hours!')
        break
      case "1 day before":
        trigger.setDate(dateDay-1)
        setBody('is tomorrow!')
        break
      case "2 days before":
        trigger.setDate(dateDay-2)
        setBody('in 2 days!')
        break
      default:
        setBody('in your reminders!')
    }
  }
  async function testTriggerNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Productivity Planner REMINDER 📬",
        body: `${title} is ${body}`,
        'content-available': 1,
        data: { data: 'some data' },
      },
      trigger: { seconds: 1}
    });
  };

  async function triggerNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Productivity Planner REMINDER 📬",
        body: `${title} is ${body}`,
        'content-available': 1,
        data: { data: 'some data' },
      },
      trigger,
    });
  };
  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
    } else {
      alert('Must use physical device for Push Notifications')
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
  
    return token
  }
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
    <View style={{ display: 'flex' }}>
      <Modal visible={props.visible}>
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
        <Dropdown
          data={["At time of event", "15 min before", "30 min before", "1 hour before", "2 hours before", "1 day before", "2 days before"]}
          set={setReminderTime}
          changeFlag={setReminder}
          defaultButtonText="Remind me"
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
            left: -180,
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
            style={styles.testNotification}
            onPress={() => {
              triggerButton(reminderTime)
              testTriggerNotification()
              registerForPushNotificationsAsync()
            }}>
            <Text>Test Notification</Text>
          </TouchableOpacity>
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
              setReminder(false)
              storeData()
              
              triggerTimer(reminderTime)
              triggerNotification()
              registerForPushNotificationsAsync()
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
    margin: 5,
  },
  testNotification: {
    backgroundColor: 'lightblue',
    width: 130,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
    width: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  typeButtonContainer: {
    flexDirection: 'row',
    margin: 5,
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
    width: 200,
    margin: 5,
    borderBottomWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default NewTask

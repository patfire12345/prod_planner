import React, { useEffect, useState } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native'
import Daily from './components/Daily'
import Monthly from './components/Monthly'
import NewTask from './components/NewTask'
import Weekly from './components/Weekly'
import AsyncStorage from '@react-native-async-storage/async-storage'

// head component of the application
export default function App() {
  const [monthState, setMonthState] = useState(false)
  const [weekState, setWeekState] = useState(false)
  const [dayState, setDayState] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [dailyTaskList, setDailyTaskList] = useState([])
  const [weeklyEventsList, setWeeklyEventsList] = useState([])
  const [markedDates, setMarkedDates] = useState({})

  const [dailyNewNote, setDailyNewNote] = useState('')
  const [dailyNewNoteButtonPressed, setDailyNewNoteButtonPressed] =
    useState(false)
  const getData = async () => {
    let keys = []
    let values = []
    try {
      keys = await AsyncStorage.getAllKeys()
      values = await AsyncStorage.multiGet(keys)

      return values
    } catch (e) {
      console.log(e)
    }
  }

  const deleteData = async () => {
    try {
      await AsyncStorage.clear()
      setDailyTaskList([])
      setWeeklyEventsList([])
      setMarkedDates({})
    } catch (e) {
      console.log(e)
    }
  }

  const showNewTaskModal = () => {
    setShowNewTask(!showNewTask)
  }

  const addToDailyTaskList = (newTask) => {
    setDailyTaskList([...dailyTaskList, newTask])
  }

  const addToWeeklyEventsList = (newEvent) => {
    setWeeklyEventsList([...weeklyEventsList, newEvent])
  }

  const addToMarkedDates = (newMarkedDate) => {
    // if (markedDates.hasOwnProperty(Object.keys(newMarkedDate)[0])) {
    //   markedDates[Object.keys(newMarkedDate)[0]].periods
    // }
    setMarkedDates({ ...markedDates, ...newMarkedDate })
  }

  useEffect(() => {
    setMonthState(false)
    setWeekState(false)
    setDayState(true)
  }, [weeklyEventsList])

  useEffect(() => {
    getData().then((keyValuePairArray) => {
      let tempDailyTaskList = []
      let tempWeeklyEventsList = []
      keyValuePairArray.map((keyValuePair, index) => {
        let jsonKeyValuePair = JSON.parse(keyValuePair[1])
        tempDailyTaskList.push({
          title: jsonKeyValuePair['title'],
          category: `${jsonKeyValuePair['duration']} hours`,
        })

        tempWeeklyEventsList.push({
          start: `${new Date(jsonKeyValuePair['date']).getFullYear()}-${
            new Date(jsonKeyValuePair['date']).getMonth() + 1
          }-${new Date(jsonKeyValuePair['date']).getDate()} ${
            new Date(jsonKeyValuePair['date']).getHours() < 10 ? 0 : ''
          }${new Date(jsonKeyValuePair['date']).getHours()}:${
            new Date(jsonKeyValuePair['date']).getMinutes() < 10 ? 0 : ''
          }${new Date(jsonKeyValuePair['date']).getMinutes()}:00`,
          duration: `${
            Math.floor(jsonKeyValuePair['duration']) < 10
              ? `${0}${Math.floor(jsonKeyValuePair['duration'])}`
              : Math.floor(jsonKeyValuePair['duration'])
          }:${
            (jsonKeyValuePair['duration'] * 60) % 60 === 0
              ? '00'
              : (jsonKeyValuePair['duration'] * 60) % 60
          }:00`,
          note: jsonKeyValuePair['title'],
        })

        if (index == keyValuePairArray.length - 1) {
          setDailyTaskList([...dailyTaskList, ...tempDailyTaskList])
          setWeeklyEventsList([...weeklyEventsList, ...tempWeeklyEventsList])
        }
      })
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Productivity Planner </Text>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            showNewTaskModal()
          }}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksWrapper}>
        <View style={styles.buttonContainer}>
          <Button
            title="Monthly"
            onPress={() => {
              setMonthState(true)
              setWeekState(false)
              setDayState(false)
            }}
          />
          <Button
            title="Weekly"
            onPress={() => {
              setMonthState(false)
              setWeekState(true)
              setDayState(false)
            }}
          />
          <Button
            title="Daily"
            onPress={() => {
              setMonthState(false)
              setWeekState(false)
              setDayState(true)
            }}
          />
        </View>
        {/* {monthState && <Notification />} */}
        {monthState && <Monthly markedDates={markedDates} />}
        {weekState && <Weekly weeklyEventsList={weeklyEventsList} />}
        {dayState && (
          <Daily
            taskList={dailyTaskList}
            dailyNewNote={dailyNewNote}
            setDailyNewNote={setDailyNewNote}
            dailyNewNoteButtonPressed={dailyNewNoteButtonPressed}
            setDailyNewNoteButtonPressed={setDailyNewNoteButtonPressed}
          />
        )}
      </View>

      <NewTask
        visible={showNewTask}
        showNewTaskModal={showNewTaskModal}
        addToTaskList={addToDailyTaskList}
        addToWeeklyEventsList={addToWeeklyEventsList}
        addToMarkedDates={addToMarkedDates}
      />

      <Button
        title="Delete Everything!"
        color="red"
        onPress={() => deleteData()}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50,
    textAlign: 'center',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  addButton: {
    borderRadius: 100,
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

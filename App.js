import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native'
import { MaterialIcons, Octicons, AntDesign } from '@expo/vector-icons'
import Daily from './components/Daily'
import Monthly from './components/Monthly'
import NewTask from './components/NewTask'
import Weekly from './components/Weekly'
import MoodPicker from './components/MoodPicker'
import MoodStats from './components/MoodStats'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { Notification } from './components/Notifications'


// head component of the application
export default function App() {
  const [monthState, setMonthState] = useState(false)
  const [weekState, setWeekState] = useState(false)
  const [dayState, setDayState] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [dailyTaskList, setDailyTaskList] = useState([])
  const [weeklyEventsList, setWeeklyEventsList] = useState([])
  const [markedDates, setMarkedDates] = useState({})
 
  const [showMood, setShowMoodModal] = useState(false);
  const [showMoodStats, setShowMoodStatsModal] = useState(false);
  const [goodCount, setGoodCount] = useState(0);
  const [averageCount, setAverageCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const [moodIcon, setMoodIcon] = useState('rest');
  const [moodColor, setMoodColor] = useState('grey')

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

  const showMoodModal = () => {
    setShowMoodModal(!showMood)
  }

  const showMoodStatsModal = () => {
    setShowMoodStatsModal(!showMoodStats)
  }

  const showNewTaskModal = () => {
    setShowNewTask(!showNewTask)
  }

  const addToDailyTaskList = (newTask) => {
    setDailyTaskList([...dailyTaskList, newTask])
  }

  const addToWeeklyEventsList = (newEvent) => {
    setWeeklyEventsList(weeklyEventsList.concat(newEvent))
  }

  const addToMarkedDates = (newMarkedDate, date, color) => {
    if (date in markedDates) {
      markedDates[date].periods.push({
        startingDay: true,
        endingDay: true,
        color: color,
      })
    } else {
      setMarkedDates({ ...markedDates, ...newMarkedDate })
    }
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
      let tempMarkedDates = {}
      keyValuePairArray.map((keyValuePair, index) => {
        let jsonKeyValuePair = JSON.parse(keyValuePair[1])

        if (
          new Date(jsonKeyValuePair['date']).getDate() ===
          new Date().getDate() &&
          new Date(jsonKeyValuePair['date']).getMonth() ===
          new Date().getMonth() &&
          new Date(jsonKeyValuePair['date']).getFullYear() ===
          new Date().getFullYear()
        ) {
          tempDailyTaskList.push({
            title: jsonKeyValuePair['title'],
            category: `${jsonKeyValuePair['duration']} hours`,
          })
        }
        tempWeeklyEventsList.push({
          start: `${new Date(jsonKeyValuePair['date']).getFullYear()}-${new Date(jsonKeyValuePair['date']).getMonth() + 1
            }-${new Date(jsonKeyValuePair['date']).getDate()} ${new Date(jsonKeyValuePair['date']).getHours() < 10 ? 0 : ''
            }${new Date(jsonKeyValuePair['date']).getHours()}:${new Date(jsonKeyValuePair['date']).getMinutes() < 10 ? 0 : ''
            }${new Date(jsonKeyValuePair['date']).getMinutes()}:00`,
          duration: `${Math.floor(jsonKeyValuePair['duration']) < 10
            ? `${0}${Math.floor(jsonKeyValuePair['duration'])}`
            : Math.floor(jsonKeyValuePair['duration'])
            }:${(jsonKeyValuePair['duration'] * 60) % 60 === 0
              ? '00'
              : (jsonKeyValuePair['duration'] * 60) % 60
            }:00`,
          note: jsonKeyValuePair['title'],
        })

        if (jsonKeyValuePair.stringDate in tempMarkedDates) {
          tempMarkedDates[jsonKeyValuePair.stringDate].periods.push({
            startingDay: true,
            endingDay: true,
            color: jsonKeyValuePair.color,
          })
        } else {
          tempMarkedDates[jsonKeyValuePair.stringDate] = {
            periods: jsonKeyValuePair.periods,
          }
        }

        if (index == keyValuePairArray.length - 1) {
          setDailyTaskList([...dailyTaskList, ...tempDailyTaskList])
          setWeeklyEventsList([...weeklyEventsList, ...tempWeeklyEventsList])
          setMarkedDates({ ...markedDates, ...tempMarkedDates })
        }
      })
    })
  }, [])

  return (
    <View style={styles.container}>
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
      <ScrollView style={styles.container}>
        <Text style={styles.title}> Productivity Planner </Text>
        <View style={styles.tasksWrapper}>
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
          reminder={reminder}
          reminderBody={reminderBody}
          reminderTime={reminderTime}
        />
        <MoodPicker
          visible={showMood}
          showMoodModal={showMoodModal}
          setGoodCount={setGoodCount}
          setAverageCount={setAverageCount}
          setBadCount={setBadCount}
          goodCount={goodCount}
          averageCount={averageCount}
          badCount={badCount}
          moodIcon={moodIcon}
          setMoodIcon={setMoodIcon}
          moodColor={moodColor}
          setMoodColor={setMoodColor}
          />
        <MoodStats
          visible={showMoodStats}
          showMoodStatsModal={showMoodStatsModal}
          setGoodCount={setGoodCount}
          setAverageCount={setAverageCount}
          setBadCount={setBadCount}
          goodCount={goodCount}
          averageCount={averageCount}
          badCount={badCount}
          />
        <Button
          title="Delete Everything!"
          color="#e32636"
          onPress={() => deleteData()}
        />
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <AntDesign 
          name={moodIcon} 
          size={48} 
          color={moodColor}
          onPress={() => {showMoodModal()}} 
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            showNewTaskModal()
          }}>
          <Text style={{ fontSize: 20, color: "white", }}>+</Text>
        </TouchableOpacity>
        <Octicons 
          name="graph" 
          size={40} 
          color="grey"
          onPress={() => {showMoodStatsModal()}} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: 'center',
  },
  tasksWrapper: {
    paddingTop: 5,
    paddingHorizontal: 20,
    zIndex: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 3,
  },
  addButton: {
    marginLeft: 10,
    marginTop: 0,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

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

export default function App() {
  const [monthState, setMonthState] = useState(false)
  const [weekState, setWeekState] = useState(false)
  const [dayState, setDayState] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [weeklyEventsList, setWeeklyEventsList] = useState([])
  const [markedDates, setMarkedDates] = useState({})

  const showNewTaskModal = () => {
    setShowNewTask(!showNewTask)
  }

  const addToTaskList = (newTask) => {
    setTaskList([...taskList, newTask])
  }

  const addToWeeklyEventsList = (newEvent) => {
    setWeeklyEventsList([...weeklyEventsList, newEvent])
  }

  const addToMarkedDates = (newMarkedDate) => {
    setMarkedDates({ ...markedDates, ...newMarkedDate })
  }

  useEffect(() => {
    setMonthState(false)
    setWeekState(false)
    setDayState(true)
  }, [weeklyEventsList])

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
        {monthState && <Monthly markedDates={markedDates} />}
        {weekState && <Weekly weeklyEventsList={weeklyEventsList} />}
        {dayState && <Daily taskList={taskList} />}
      </View>

      <NewTask
        visible={showNewTask}
        showNewTaskModal={showNewTaskModal}
        addToTaskList={addToTaskList}
        addToWeeklyEventsList={addToWeeklyEventsList}
        addToMarkedDates={addToMarkedDates}
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

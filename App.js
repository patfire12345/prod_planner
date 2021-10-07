import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Daily from './components/Daily'
import Monthly from './components/Monthly'
import Weekly from './components/Weekly'

export default function App() {
  const [monthState, setMonthState] = useState(false)
  const [weekState, setWeekState] = useState(false)
  const [dayState, setDayState] = useState(false)
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Productivity Planner </Text>
      {/* Add button, styling needs work */}
      {/* <View style={styles.addButton}>
        <Button title="+" />
      </View> */}
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
        {monthState && <Monthly />}
        {weekState && <Weekly />}
        {dayState && <Daily />}
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
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
})

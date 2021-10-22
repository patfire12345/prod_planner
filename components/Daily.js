import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Task from './Task'

// Daily View
const Daily = (props) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <Text style={styles.sectionTitle}>{Date()}</Text>

      <View style={styles.items}>
        {props.taskList.map((task, index) => (
          <Task title={task.title} category={task.category} key={index} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  items: {
    marginTop: 30,
  },
})

export default Daily

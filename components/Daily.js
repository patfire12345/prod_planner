import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Task from './Task'

const Daily = (props) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <Text style={styles.sectionTitle}>{Date()}</Text>

      <View style={styles.items}>
        <Task title="Buy Groceries" category="school" />
        {props.taskList.map((task) => (
          <Task title={task.title} category={task.category} />
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

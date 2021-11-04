import React, { useState } from 'react'
import {
  Button,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native'
import Task from './Task'
import TimePicker from './TimePicker'
import UpdateTaskTimeDaily from './UpdateTaskTimeDaily'

const Daily = (props) => {
  const [showTaskDetails, setShowTaskDetails] = useState([])

  return (
    <View>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <Text style={styles.sectionTitle}>{Date()}</Text>

      {props.taskList.map((task, index) => (
        <View>
          <TouchableOpacity
            style={styles.items}
            onPress={() => setShowTaskDetails(!showTaskDetails)}>
            <Task title={task.title} category={task.category} key={index} />
          </TouchableOpacity>
          <UpdateTaskTimeDaily
            showTaskDetails={showTaskDetails}
            taskList={props.taskList}
            index={index}
          />
        </View>
      ))}

      <View>
        {props.dailyNewNoteButtonPressed ? (
          <View>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              placeholder="  Notes"
              onChangeText={(newNote) => props.setDailyNewNote(newNote)}
              defaultValue={props.dailyNewNote}
              value={props.dailyNewNote}
              multiline={true}
              numberOfLines={10}
            />
            <Button
              style={styles.container}
              title="Add"
              onPress={() =>
                props.setDailyNewNoteButtonPressed(
                  !props.dailyNewNoteButtonPressed
                )
              }
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              props.setDailyNewNoteButtonPressed(
                !props.dailyNewNoteButtonPressed
              )
            }>
            <Text>Notes</Text>
            <Text style={{ fontSize: 24 }}>{props.dailyNewNote}</Text>
          </TouchableOpacity>
        )}
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
})

export default Daily

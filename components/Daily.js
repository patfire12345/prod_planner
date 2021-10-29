import React from 'react'
import {
  Button,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native'
import Task from './Task'

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
            <Text style={{ fontSize: 42 }}>{props.dailyNewNote}</Text>
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

  subtitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  postInput: {
    fontSize: 24,
    borderColor: '#42435b',
    borderWidth: 1,
    margin: 10,
    fontFamily: 'Outrun future',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
})

export default Daily

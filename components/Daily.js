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

var d = new Date();
var day = d.getDay();
var date = d.getDate();
var month = d.getMonth();
var days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
var months = [ "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER" ];
var selectedMonth = months[month]
var selectedDay = days[day]
var today = selectedDay + ", " + selectedMonth + " " + date;

const Daily = (props) => {
  return (
    <View>
      
      <Text style={styles.sectionTitle}>TODAY: {today}</Text>

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
            <Text style={{ fontSize: 24 }}>{props.dailyNewNote}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: 'teal',
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
})

export default Daily

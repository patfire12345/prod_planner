import React from 'react'
import { Button, SafeAreaView, Alert, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, useState, postInput, setInput } from 'react-native'
import Task from './Task'

const Daily = (props) => {
  const [newNote, setNote] = React.useState('');

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

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="  Notes"
          onChangeText={(newNote) => setNote(newNote)}
          defaultValue={newNote}
          value={newNote}
          multiline={true}
          numberOfLines={10}

        />
      </View>

      <View>
        <Button style={StyleSheet.container}
          title="Add"
          onPress={handlePress}
        />
      </View>


    </View>


  )
}

const handlePress = (newNote) => {
  return (
    <Text style={{ fontSize: 42 }}>
      {newNote}
    </Text>



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
    fontFamily: "Outrun future",
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
})


export default Daily

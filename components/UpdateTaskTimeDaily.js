import React from 'react'
import { TouchableOpacity, Text, Modal, StyleSheet } from 'react-native'
import TimePicker from './TimePicker'

const UpdateTaskTimeDaily = (props) => {
  return (
    <Modal visible={props.showTaskDetails}>
      <Text>{props.taskList[props.index].title}</Text>
      <TimePicker
        // hour={time.getHours()}
        // minute={
        //   time.getMinutes() < 10
        //     ? `0${time.getMinutes()}`
        //     : `${time.getMinutes()}`
        // }
        text="Time"
        // setTime={setTime} <=
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowTaskDetails(!props.showTaskDetails)
        }}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </Modal>
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

export default UpdateTaskTimeDaily

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

// Monthly View
const Monthly = (props) => {
  return (
    <View>
      <Calendar
        markingType={'multi-period'}
        // markedDates={{
        //   '2021-10-11': {
        //     periods: [
        //       { startingDay: true, endingDay: false, color: 'blue' },
        //       { startingDay: true, endingDay: false, color: 'black' },
        //     ],
        //   },
        //   '2021-10-12': {
        //     periods: [{ startingDay: true, endingDay: false, color: 'green' }],
        //   },
        // }}
        markedDates={props.markedDates}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Monthly

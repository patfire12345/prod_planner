import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WeeklyCalendar from 'react-native-weekly-calendar'

// Weekly View
const Weekly = (props) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <WeeklyCalendar events={props.weeklyEventsList} style={{}} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Weekly

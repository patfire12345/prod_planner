import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Modal, Dimensions } from 'react-native'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { StackedBarChart, PieChart } from 'react-native-chart-kit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MoodPicker from './MoodPicker'

// Component that shows mood stats
const MoodStats = (props) => {

  var goodData = props.goodCount
  var averageData = props.averageCount
  var badData = props.badCount

  const screenWidth = Dimensions.get("window").width

  var stackedBarData = {
    labels: [ "Last Month", "This Month"],
    legend: ["Good Mood", "Average Mood", "Bad Mood"],
    data: [
      [3, 2, 1], //fake data for display only
      [goodData, averageData, badData]
    ],
    barColors: ["#058ED9", "#848FA2", "#CC2D35"]
  };

  const pieData = [
    {
      name: "Good Mood",
      population: goodData+3,
      color: "#058ED9",
      legendFontColor: "#058ED9",
      legendFontSize: 14
    },
    {
      name: "Average Mood",
      population: averageData+2,
      color: "#848FA2",
      legendFontColor: "#848FA2",
      legendFontSize: 14
    },
    {
      name: "Bad Mood",
      population: badData+1,
      color: "#CC2D35",
      legendFontColor: "#CC2D35",
      legendFontSize: 14
    },
  ];
  const ChartConfig = {
    backgroundColor: "white",
    backgroundGradientFrom: "lightblue",
    backgroundGradientTo: "teal",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }

  return (
    <View style={styles.container}>
      <Modal 
        style={styles.modalStyle}
        visible={props.visible} 
        animationType={'slide'}
      >
        <View style={styles.moodModalHeader}>
          <Ionicons 
            name="close" 
            size={40} 
            color="darkgrey" 
            onPress={() => {props.showMoodStatsModal(false)}}
          />
        </View>
        <View style={styles.modalContent}>
          <Text style={{fontSize: 16}}>Monthly Mood Stats </Text>
          <Octicons 
            name="graph" size={24} color="purple" />
        </View>
        <View style={styles.modalContent}>
        </View>
        <View style={styles.modalContent}>
          <StackedBarChart
            data={stackedBarData}
            width={screenWidth} // from react-native
            height={200}
            yAxisInterval={3}
            chartConfig={ChartConfig}
          />
        </View>
        <View style={styles.modalContent}>
          <Text style={{fontSize: 16}}>Lifetime Mood Stats </Text>
          <Ionicons 
            name="pie-chart" size={24} color="purple" />
        </View>
        <View style={styles.modalContent}>
          <PieChart
            data={pieData}
            width={screenWidth} // from react-native
            height={150}
            accessor={"population"}
            chartConfig={ChartConfig}
            paddingLeft={"15"}
            center={[10, 10]}
            absolute
          />
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#00000080'
  },
  modalStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 20,
      backgroundColor: '#00000080'
  },
  moodModalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff', 
    padding: 20
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#575DD9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 6,
    paddingHorizontal: 22,
    marginTop: 20,
    marginHorizontal: 90,
    borderRadius: 6,
  }
})

export default MoodStats;
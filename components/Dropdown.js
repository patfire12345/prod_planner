import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

const Dropdown = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <SelectDropdown
        data={props.data}
        defaultButtonText={<Text></Text>}
        buttonStyle={props.buttonStyle}
        onSelect={(item, index) => {
          props.set(item)
          props.changeFlag(true)

          return item
        }}
        // buttonTextAfterSelection={(item, index) => {
        //   return (
        //     <Text key={`${index}-${item}`}>
        //       {item} {props.unit}
        //     </Text>
        //   )
        // }}
        // rowTextForSelection={(item, index) => {
        //   {
        //     return (
        //       !props.isColor && (
        //         <Text key={`${index}-${item}`}>
        //           {item} {props.unit}
        //         </Text>
        //       )
        //     )
        //   }
        // }}
        renderCustomizedRowChild={(item, index) => {
          {
            return props.isColor ? (
              <View
                key={index}
                width={40}
                height={50}
                backgroundColor={props.data[index]}
              />
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text key={`${index}-${item}`}>{item}</Text>
              </View>
            )
          }
        }}
        renderCustomizedButtonChild={(item, index) => {
          {
            return props.isColor ? (
              <View
                key={index}
                width={50}
                height={25}
                backgroundColor={props.data[index]}
              />
            ) : (
              <View style={styles.buttonTextContainer}>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                  }}
                  key={`${index}-${item}`}>
                  {item}
                </Text>
              </View>
            )
          }
        }}
      />
      <View style={styles.buttonTextContainer}>
        <Text style={props.buttonText}>{props.defaultButtonText}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonTextContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Dropdown

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Times.styles'
import { getTimeLabelHeight } from '../utils'

const intervalIndexToTimeString = (index) =>
  `${
    Math.floor(index / 4) < 10
      ? `0${Math.floor(index / 4)}`
      : Math.floor(index / 4)
  }:${
    Math.floor((index * 15) % 60) < 10
      ? `0${Math.floor((index * 15) % 60)}`
      : Math.floor((index * 15) % 60)
  }`

const Times = ({ times, hoursInDisplay, timeStep, textStyle, interval }) => {
  const height = getTimeLabelHeight(hoursInDisplay, timeStep)
  return (
    <View style={styles.columnContainer}>
      {times.map((time, index) => (
        <View key={time} style={[styles.label, { height }]}>
          <Text style={[styles.text, textStyle]}>{time}</Text>
          {
            !!interval.start && 
            interval.start > index*4 && 
            interval.start < (index+1)*4 && <Text style={[styles.text, textStyle, {marginTop: (interval.start%4)*height/4-14}]}>{intervalIndexToTimeString(interval.start)}</Text>
          }
          {
            !!interval.end && 
            interval.end > index*4 && 
            interval.end < (index+1)*4 && <Text style={[styles.text, textStyle, {marginTop: (interval.end%4)*height/4-14}]}>{intervalIndexToTimeString(interval.end)}</Text>
          }
        </View>
      ))}
    </View>
  )
}

Times.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  hoursInDisplay: PropTypes.number.isRequired,
  timeStep: PropTypes.number.isRequired,
  textStyle: Text.propTypes.style,
}

export default React.memo(Times)

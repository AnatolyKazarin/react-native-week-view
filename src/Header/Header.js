import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import moment from 'moment'

import {
  getFormattedDate,
  calculateDaysArray,
  availableNumberOfDays,
  WIDTH,
} from '../utils'
import styles from './Header.styles'

const getDayTextStyles = (numberOfDays) => {
  const fontSize = numberOfDays === 7 ? 12 : 14
  return {
    fontSize,
  }
}

const Column = ({
  column,
  numberOfDays,
  format,
  style,
  textStyle,
  textDateStyle,
  TodayComponent,
}) => {
  const formattedDate = getFormattedDate(column, format).split(' ')
  const useTodayComponent = TodayComponent && moment().isSame(column, 'days')
  const fullTextStyle = [getDayTextStyles(numberOfDays), textStyle]

  return (
    <View style={[styles.column, style]}>
      {useTodayComponent ? (
        <TodayComponent
          date={column}
          formattedDate={formattedDate}
          textStyle={fullTextStyle}
        />
      ) : (
        <View style={styles.headerContainer}>
          <Text style={fullTextStyle}>{formattedDate[0]}</Text>
          {formattedDate[1] && (
            <Text style={[fullTextStyle, textDateStyle]}>
              {formattedDate[1]}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

const Columns = ({
  columns,
  numberOfDays,
  format,
  style,
  textStyle,
  textDateStyle,
  TodayComponent,
}) => {
  return (
    <View style={styles.columns}>
      {columns.map((column) => {
        return (
          <Column
            style={style}
            textStyle={textStyle}
            textDateStyle={textDateStyle}
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
            TodayComponent={TodayComponent}
          />
        )
      })}
    </View>
  )
}

const WeekViewHeader = ({
  numberOfDays,
  initialDate,
  formatDate,
  style,
  textStyle,
  textDateStyle,
  TodayComponent,
  rightToLeft,
}) => {
  const columns = calculateDaysArray(initialDate, numberOfDays, rightToLeft)
  return (
    <View style={styles.container}>
      {columns && (
        <Columns
          format={formatDate}
          columns={columns}
          numberOfDays={numberOfDays}
          style={style}
          textStyle={textStyle}
          textDateStyle={textDateStyle}
          TodayComponent={TodayComponent}
        />
      )}
    </View>
  )
}

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf(availableNumberOfDays).isRequired,
  initialDate: PropTypes.string.isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  rightToLeft: PropTypes.bool,
  TodayComponent: PropTypes.elementType,
}

WeekViewHeader.defaultProps = {
  formatDate: 'MMM D',
}

export default React.memo(WeekViewHeader)

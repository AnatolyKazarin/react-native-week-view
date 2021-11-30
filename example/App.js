/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
  Text,
  View,
} from 'react-native'

import WeekView, {
  createFixedWeekDate,
  addLocale,
} from 'react-native-week-view'

const generateDates = (hours, minutes) => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  if (minutes != null) {
    date.setMinutes(minutes)
  }
  return date
}

const sampleEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: generateDates(0),
    endDate: generateDates(2),
    color: 'blue',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: generateDates(1),
    endDate: generateDates(4),
    color: 'red',
  },
  {
    id: 3,
    description: 'Event 3',
    startDate: generateDates(-5),
    endDate: generateDates(-3),
    color: 'green',
  },
]

const sampleFixedEvents = [
  {
    id: 1,
    description: 'Event 1',
    startDate: createFixedWeekDate('Monday', 12),
    endDate: createFixedWeekDate(1, 14),
    color: 'blue',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: createFixedWeekDate('wed', 16),
    endDate: createFixedWeekDate(3, 17, 30),
    color: 'red',
  },
]

addLocale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthsShort: [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ],
  weekdays: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  weekdaysMin: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
})

// For debugging purposes
const showFixedComponent = false

class App extends React.Component {
  state = {
    events: showFixedComponent ? sampleFixedEvents : sampleEvents,
    selectedDate: new Date(),
    start: -1,
    end: -1
  }

  onEventPress = ({ id, color, startDate, endDate }) => {
    Alert.alert(
      `event ${color} - ${id}`,
      `start: ${startDate}\nend: ${endDate}`,
    )
  }

  onGridClick = (event, startHour, date) => {
    const dateStr = date.toISOString().split('T')[0]
    // Alert.alert(`Date: ${dateStr}\nStart hour: ${startHour}`)
  }

  render() {
    const { events, selectedDate } = this.state
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <WeekView
            ref={(r) => {
              this.componentRef = r
            }}
            events={events}
            selectedDate={selectedDate}
            numberOfDays={7}
            onEventPress={this.onEventPress}
            onGridClick={this.onGridClick}
            headerStyle={styles.header}
            headerTextStyle={styles.headerText}
            headerTextDateStyle={styles.headerTextDate}
            hourTextStyle={styles.hourText}
            eventContainerStyle={styles.eventContainer}
            EventComponent={() => (
              <View style={{}}>
                <Text style={{ color: '#333333' }}>Event</Text>
              </View>
            )}
            formatDateHeader={showFixedComponent ? 'ddd' : 'dd D'}
            hoursInDisplay={10}
            timeStep={60}
            startHour={8}
            fixedHorizontally={showFixedComponent}
            showTitle={false}
            showNowLine
            formatTimeLabel={'HH:mm'}
            locale={'ru'}
            onIntervalSelected={(start, end) => Alert.alert(`Start: ${start}, End: ${end}`)}
          />
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 30,
  },
  header: {
    borderColor: '#fff',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#9C9C9C',
  },
  headerTextDate: {
    color: '#333333',
    marginVertical: 8,
  },
  hourText: {
    color: 'black',
    fontSize: 10,
  },
  eventContainer: {
    borderRadius: 3,
    backgroundColor: '#FEF5EE',
  },
})

export default App

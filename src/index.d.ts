import { TextStyle, ViewStyle } from 'react-native'

export type WeekViewProps = {
  events: Event[]
  formatDateHeader: string
  numberOfDays: number
  weekStartsOn: number
  onSwipeNext: () => void
  onSwipePrev: () => void
  onEventPress: (event: Event) => void
  onEventLongPress: (event: Event) => void
  onGridClick: (event: Event, dayIndex: number, longPress: boolean) => void
  onGridLongPress: (event: Event, dayIndex: number, longPress: boolean) => void
  onTimeIntervalSelected: (start: Date, end: Date) => void
  headerStyle: ViewStyle
  headerTextStyle: TextStyle
  headerTextDateStyle: TextStyle
  hourTextStyle: TextStyle
  eventContainerStyle: ViewStyle
  selectedDate: Date
  locale: string
  hoursInDisplay: number
  timeStep: number
  formatTimeLabel: string
  startHour: number
  EventComponent: JSX.Element
  TodayHeaderComponent: JSX.Element
  showTitle: boolean
  rightToLeft: boolean
  fixedHorizontally: boolean
  prependMostRecent: boolean
  showNowLine: boolean
  nowLineColor: string
  showClickedSlot: boolean
}

export type WeekViewState = {
  currentMoment: Date
  initialDates: string[]
  topSelectedIndex: number
  bottomSelectedIndex: number
  scrollEnabled: boolean
}

export type Event = {
  id: number
}

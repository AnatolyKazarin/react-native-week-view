import { StyleSheet } from 'react-native'
import { WIDTH } from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH*7/8,
  },
})

export default styles

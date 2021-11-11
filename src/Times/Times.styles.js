import { StyleSheet } from 'react-native';
import {CONTAINER_WIDTH} from '../utils'

const styles = StyleSheet.create({
  columnContainer: {
    paddingTop: 10,
    width: (CONTAINER_WIDTH+60)/8,
    zIndex: 1
  },
  label: {
    flex: -1,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;

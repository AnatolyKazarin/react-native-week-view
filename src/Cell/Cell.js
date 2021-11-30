import React, { useRef, useState, useMemo, useEffect } from 'react'
import {
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native'
import { getTimeLabelHeight, WIDTH } from '../utils'

export const Cell = React.memo(
  ({
    hoursInDisplay,
    timeStep,
    setScrollEnabled,
    dayIndex,
    hour,
    onTimeIntervalChanged,
    onIntervalSelected,
  }) => {
    const [bottomTimeIndex, setBottomTimeIndex] = useState(4 * (hour + 1))
    const [topTimeIndex, setTopTimeIndex] = useState(4 * hour)
    const [panReleased, setPanReleased] = useState(false)

    const offset = getTimeLabelHeight(hoursInDisplay, timeStep)

    const height = useRef(offset)

    const heightAnim = useRef(new Animated.Value(height.current)).current

    const panTopButton = useRef(new Animated.ValueXY()).current
    const panBottomButton = useRef(new Animated.ValueXY()).current

    const topButtonPosition = useRef(new Animated.Value(-5)).current
    const bottomButtonPosition = useRef(new Animated.Value(height.current - 8))
      .current

    const panTopButtonResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: (_, gestureState) => {
            Vibration.vibrate(100)
            setScrollEnabled()
            panTopButton.setOffset({
              x: panTopButton.x._value,
              y: panTopButton.y._value,
            })
          },
          onPanResponderMove: (_, gestureState) => {
            if (heightAnim._value > offset / 4) {
              bottomTimeIndex === -1
                ? setTopTimeIndex(
                    Math.round(
                      (4 *
                        (hour * offset +
                          gestureState.dy -
                          offset / 4 -
                          height.current +
                          offset)) /
                        offset,
                    ),
                  )
                : setTopTimeIndex(
                    Math.floor(
                      (4 *
                        ((bottomTimeIndex * offset) / 4 +
                          gestureState.dy -
                          height.current)) /
                        offset,
                    ),
                  )
              panTopButton.setValue({
                x: gestureState.dx,
                y: gestureState.dy,
              })
              heightAnim.setValue(height.current - gestureState.dy)
              bottomButtonPosition.setValue(
                height.current - gestureState.dy - 8,
              )
            } else {
              if (height.current - gestureState.dy > offset / 4)
                heightAnim.setValue(height.current - gestureState.dy)
            }
          },
          onPanResponderRelease: (_, gestureState) => {
            height.current -= gestureState.dy
            panTopButton.flattenOffset()
            setScrollEnabled()
            setPanReleased(!panReleased)
          },
          onPanResponderTerminationRequest: () => false,
        }),
      [height.current, bottomTimeIndex],
    )

    const panBottomButtonResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            Vibration.vibrate(100)
            setScrollEnabled()
            panBottomButton.setOffset({
              x: panBottomButton.x._value,
              y: panBottomButton.y._value,
            })
          },
          onPanResponderMove: (_, gestureState) => {
            if (heightAnim._value > offset / 4) {
              topTimeIndex === -1
                ? setBottomTimeIndex(
                    Math.round(
                      (4 *
                        (offset * (hour + 1) + gestureState.dy - offset / 4)) /
                        offset,
                    ),
                  )
                : setBottomTimeIndex(
                    Math.floor(
                      (4 *
                        ((topTimeIndex * offset) / 4 +
                          height.current +
                          gestureState.dy)) /
                        offset,
                    ),
                  )
              panBottomButton.setValue({
                x: gestureState.dx,
                y: gestureState.dy,
              })
              heightAnim.setValue(height.current + gestureState.dy)
              bottomButtonPosition.setValue(
                height.current + gestureState.dy - 8,
              )
            } else {
              if (height.current + gestureState.dy > offset / 4)
                heightAnim.setValue(height.current + gestureState.dy)
            }
          },
          onPanResponderRelease: (_, gestureState) => {
            height.current += gestureState.dy
            panBottomButton.flattenOffset()
            setScrollEnabled()
            setPanReleased(!panReleased)
          },
          onPanResponderTerminationRequest: () => false,
        }),
      [height.current, topTimeIndex],
    )

    useEffect(() => {
      height.current = offset
      heightAnim.setValue(offset)
      bottomButtonPosition.setValue(offset - 8)
      panTopButton.y.setValue(0)
      setTopTimeIndex(4 * hour)
      setBottomTimeIndex(4 * (hour + 1))
    }, [dayIndex, hour])

    useEffect(
      () =>
        onTimeIntervalChanged &&
        onTimeIntervalChanged(topTimeIndex, bottomTimeIndex),
      [topTimeIndex, bottomTimeIndex, onTimeIntervalChanged],
    )

    useEffect(
      () =>
        onIntervalSelected && onIntervalSelected(topTimeIndex, bottomTimeIndex),
      [panReleased, onIntervalSelected],
    )
    return (
      <TouchableWithoutFeedback onPress={() => {}}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 1 + (dayIndex * WIDTH) / 8,
              top: 17 + hour * offset,
              width: WIDTH / 8 - 1,
              borderWidth: 2,
              borderColor: '#DD6390',
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              height: heightAnim,
              zIndex: 1000,
            },
            { transform: [{ translateY: panTopButton.y }] },
          ]}>
          <Animated.View
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
              position: 'absolute',
              top: topButtonPosition,
              left: -7,
              width: 14,
              height: 14,
              backgroundColor: '#DD6390',
              zIndex: 100000,
              borderRadius: 6,
              borderColor: 'rgb(231, 173, 195)',
              borderWidth: 3,
            }}
            {...panTopButtonResponder.panHandlers}
          />
          <Animated.View
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
              position: 'absolute',
              top: bottomButtonPosition,
              right: -7,
              width: 14,
              height: 14,
              backgroundColor: '#DD6390',
              borderRadius: 6,
              borderColor: 'rgb(231, 173, 195)',
              borderWidth: 3,
            }}
            {...panBottomButtonResponder.panHandlers}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  },
)

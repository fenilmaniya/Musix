import React, {useCallback, useState} from 'react';
import { connect } from 'react-redux';
import {
  Text, TouchableOpacity, View, 
} from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, {
  and,
  Clock,
  clockRunning,
  concat,
  cond,
  Easing,
  eq,
  greaterThan,
  lessOrEq,
  multiply,
  not,
  set,
  startClock,
  stopClock,
  useCode,
  Value,
} from 'react-native-reanimated';
import { bin, delay, loop, timing } from "react-native-redash"
import UIUtils from '../../../utils/UiUtils';
import styles from './style';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors,} from '../../../constants';
import {
  setNextSong,
  addCurrentSongFavorite
} from '../../../actions/song';

const POLLING_PERIOD_SECONDS = 10

const OFFSET = 150

function StickeyPlayer({
  currentSong, isFavorite,
  setNextSong, addCurrentSongFavorite,
  navigation,
}) {

  const [trackWidth, setTrackWidth] = useState(0)
  const [isPlaying, setIsPlaying]=useState(false);
  
  const currentProgressPct=10;
  const intervalAmountPct=1;

  const animatedProgress = new Value(0)
  const progressClock = new Clock()
  
  const trackTitleclock = new Clock()
  const mayStartAnimation = new Value(0)
  const translateX = new Value(0)

  const heartScale = new Animated.Value(1)
  const captureTitleWidth = useCallback((e) => {
    // trackTitleWidth$.next(e.nativeEvent.layout.width)
  }, [])

  const captureTotalWidth = useCallback((e) => {
    // artistWidth$.next(e.nativeEvent.layout.width)
  }, [])

  const timingTo = currentProgressPct + intervalAmountPct

  useCode(
    () => [
      cond(
        eq(1, bin(false)),
        cond(
          greaterThan(new Value(currentProgressPct), 0),
          set(
            animatedProgress,
            timing({
              duration: POLLING_PERIOD_SECONDS * 1000,
              from: currentProgressPct,
              to: timingTo >= 100 ? 100 : timingTo,
              easing: Easing.linear,
              clock: progressClock,
            }),
          ),
        ),
        set(animatedProgress, currentProgressPct),
      ),
    ],
    [currentProgressPct, isPlaying],
  )

  const progressValue = concat(animatedProgress, "%")

  const titleIsTooLong = (`${currentSong?.title} • ${currentSong?.subtitle}`).length > 44
  const validTrackWidth = trackWidth > 0

  useCode(
    () => [
      cond(
        and(eq(1, bin(validTrackWidth)), eq(1, bin(titleIsTooLong))),
        [
          set(mayStartAnimation, 1),
          cond(not(clockRunning(trackTitleclock)), startClock(trackTitleclock)),
          set(
            translateX,
            multiply(
              -trackWidth - OFFSET,
              loop({
                duration: 15 * 1000,
                easing: Easing.linear,
                clock: trackTitleclock,
                autoStart: false,
              }),
            ),
          ),
        ],
        set(translateX, 0),
      ),
    ],
    [titleIsTooLong, validTrackWidth, trackWidth],
  )

  useCode(
    () => [
      cond(
        and(
          // TODO: this is not working well on iOS
          eq(1, mayStartAnimation),
          lessOrEq(translateX, -trackWidth - OFFSET + 0.5),
        ),
        [stopClock(trackTitleclock), delay(startClock(trackTitleclock), 1000)],
      ),
    ],
    [translateX, trackWidth, mayStartAnimation],
  )

  if (currentSong!=null) {
    return (
      <View
        style={[
          styles.bar,
        ]}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressValue,
            },
          ]}
        />
        <View style={styles.progressBarBackground} />
        <Animated.View
          style={[styles.iconContainer, { transform: [{ scale: heartScale }] }]}>
          <TouchableWithoutFeedback
            onPressIn={() =>
              Animated.timing(heartScale, UIUtils.heartScaleAnim.in).start()
            }
            onPressOut={() =>
              Animated.timing(heartScale, UIUtils.heartScaleAnim.out).start()
            }>
            <AntIcon
              name={isFavorite ? "heart" : "hearto"}
              size={24}
              style={[
                styles.heartIcon,
                {
                  color: isFavorite ? colors.green : colors.white,
                },
              ]}
              onPress={addCurrentSongFavorite}
            />
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.Text
          onLayout={captureTitleWidth}
          onPress={() => navigation.navigate('playerView')}
          style={[
            styles.title,
            {
              transform: [{ translateX }],
            },
          ]}>
          {`${currentSong?.title} • `}
        </Animated.Text>
        <Animated.Text
          onLayout={captureTotalWidth}
          style={[
            styles.artist,
            {
              transform: [{ translateX }],
            },
          ]}>
          {currentSong?.subtitle}
        </Animated.Text>
        <View style={styles.controlsContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <IonIcon
                name={isPlaying ? "ios-pause" : "ios-play"}
                size={28}
                style={styles.playIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={setNextSong}
            >
              <IonIcon
                name="play-skip-forward"
                size={28}
                style={styles.playIcon}
              />
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    )
  }
 
  return null;
}

const mapStateToProps = state => ({
  currentSong: state.song.currentSong,
  isFavorite: state.song.isCurrentSongFavorite,
})

const mapDispatchToProps = dispatch => ({
  setNextSong: () => dispatch(setNextSong()),
  addCurrentSongFavorite: () => dispatch(addCurrentSongFavorite())
})

export default connect(mapStateToProps, mapDispatchToProps)(StickeyPlayer);
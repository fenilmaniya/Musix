import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator, TouchableOpacity, View, 
} from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, {
  Value,
} from 'react-native-reanimated';
import { bin, delay, loop, timing } from "react-native-redash"
import UIUtils from '../../../utils/UiUtils';
import styles from './style';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors,} from '../../../constants';

// actions
import {
  handlePlayPauseAction
} from '../../../actions/player';
import {
  setNextSong,
  addCurrentSongFavorite
} from '../../../actions/song';

function StickeyPlayer({
  currentSong, isFavorite, isPlaying, isSongLoading, currentPosition,
  setNextSong, addCurrentSongFavorite, handlePlayPause, 
  navigation,
}) {

  const heartScale = new Animated.Value(1)
  const translateX = new Value(0)

  const songDuration=currentSong ? currentSong.more_info.duration : 0;

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
              width: `${(currentPosition/songDuration)*100}%`,
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
          onPress={() => navigation.navigate('playerView')}
          style={[
            styles.title,
            {
              transform: [{ translateX }],
            },
          ]}>
          {`${currentSong?.title}`}
        </Animated.Text>
        <View style={styles.controlsContainer}>
          <View style={styles.iconContainer}>

            {isSongLoading
              ? <ActivityIndicator 
                  color={colors.white} 
                  size={30} />
              : <TouchableOpacity
                  onPress={handlePlayPause}
                >
                  <IonIcon
                    name={!isPlaying ? "ios-pause" : "ios-play"}
                    size={28}
                    style={styles.playIcon}
                  />
                </TouchableOpacity>
            }
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
  currentPosition: state.player.currentPosition,
  isFavorite: state.song.isCurrentSongFavorite,
  isPlaying: state.player.isPlaying,
  isSongLoading: state.player.isSongLoading
})

const mapDispatchToProps = dispatch => ({
  setNextSong: () => dispatch(setNextSong()),
  addCurrentSongFavorite: () => dispatch(addCurrentSongFavorite()),
  handlePlayPause: () => dispatch(handlePlayPauseAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(StickeyPlayer);
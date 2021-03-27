import React, { useEffect, useContext } from 'react';
import { connect } from "react-redux";
import Slider from 'react-native-slider';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { colors } from '../constants';

import { withPlayer, PlayerContext } from '../player';

const ScreenWidth = Dimensions.get('window').width;

function MSlider({
  currentSong, currentPosition
}) {
  const {player}=useContext(PlayerContext);

  const pad=(n) => n < 10 ? `0${n}` : n;
  const songDuration=currentSong.more_info.duration;
  const currentTimeText=` ${pad(Math.floor(currentPosition/60))}:${pad(Math.floor(currentPosition%60))} `
  const durationTimeText=` ${pad(Math.floor(songDuration/60))}:${pad(Math.floor(songDuration%60))} `

  const seekTo = (value) => {
    if (player && value>=0) player.setCurrentTime(value)
  }

  return (
    <View>
      <Slider
        value={currentPosition}
        minimumValue={0}
        maximumValue={songDuration}
        style={{ width: '100%'}}
        minimumTrackTintColor={colors.white}
        maximumTrackTintColor={`rgba(255, 255, 255, 0.3)`}
        thumbTouchSize={{
          width: ScreenWidth * 1.5,
          height: 40
        }}
        trackStyle={{
          height: 3
        }}
        thumbStyle={{
          height: 0,
          width: 0
        }}
        onSlidingComplete={seekTo}
      />
      <View style={styles.timeContiner}>
        <Text style={styles.timeText}> { currentTimeText } </Text>
        <Text style={styles.timeText}> { durationTimeText } </Text>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  timeContiner: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.white
  }
})

const mapStateToProps = state => ({
  currentSong: state.song.currentSong,
  currentPosition: state.player.currentPosition,
})

export default connect(mapStateToProps)(withPlayer(MSlider));
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Text, SafeAreaView, View, Image,
} from 'react-native';
import styles from './style';
import { colors, gStyle } from '../../constants';
import { formatTime } from '../../utils';

import ModalHeader from './header';

//actions
import { addCurrentSongFavorite } from '../../actions/song';

import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TouchIcon from '../../components/TouchIcon';

function PlayerView({
  currentSong, isFavorite,
  addCurrentSongFavorite,
  navigation
}) {

  const [paused, setPaused]=useState(true);

  const iconPlay = paused ? 'play-circle' : 'pause-circle';

  const timePast = formatTime(0);
  const timeLeft = formatTime(100);

  const togglePlay = () => setPaused(!paused)

  return (
    <SafeAreaView style={gStyle.container}>
      <ModalHeader
        left={<IonIcon color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        text={currentSong.title}
      />

      <View style={gStyle.p3}>
        <Image source={{ uri: currentSong.image }} style={styles.image} />

        <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
          <View style={styles.containerSong}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.song}>
              {currentSong.title}
            </Text>
            <Text style={styles.artist}>{currentSong.artist}</Text>
          </View>
          <View style={styles.containerFavorite}>
            <TouchIcon
              icon={<AntIcon 
                  color={isFavorite ? colors.green : colors.white} 
                  name={isFavorite ? 'heart' : 'hearto'} />}
              onPress={addCurrentSongFavorite}
            />
          </View>
        </View>

        <View style={styles.containerVolume}>
          {/* <Slider
            minimumValue={0}
            maximumValue={currentSong.length}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.grey3}
          /> */}
          <View style={styles.containerTime}>
            <Text style={styles.time}>{timePast}</Text>
            <Text style={styles.time}>{`-${timeLeft}`}</Text>
          </View>
        </View>

        <View style={styles.containerControls}>
          <TouchIcon
            icon={<IonIcon color={colors.greyLight} name="shuffle" />}
            onPress={() => null}
          />
          <View style={gStyle.flexRowCenterAlign}>
            <TouchIcon
              icon={<IonIcon color={colors.white} name="play-skip-back" />}
              iconSize={32}
              onPress={() => null}
            />
            <View style={gStyle.pH3}>
              <TouchIcon
                icon={<IonIcon color={colors.white} name={iconPlay} />}
                iconSize={64}
                onPress={togglePlay}
              />
            </View>
            <TouchIcon
              icon={<IonIcon color={colors.white} name="play-skip-forward" />}
              iconSize={32}
              onPress={() => null}
            />
          </View>
          <TouchIcon
            icon={<FeatherIcon color={colors.greyLight} name="repeat" />}
            onPress={() => null}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  currentSong: state.song.currentSong,
  isFavorite: state.song.isCurrentSongFavorite
})

const mapDispatchToProps = dispatch => ({
  
  addCurrentSongFavorite: () => dispatch(addCurrentSongFavorite())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerView)
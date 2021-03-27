import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import {
  Text, SafeAreaView, View, Image, ActivityIndicator,
} from 'react-native';
import styles from './style';
import { colors, gStyle } from '../../constants';
import { formatTime } from '../../utils';

import ModalHeader from './header';
import Slider from '../../components/Slider';

//actions
import { 
  addCurrentSongFavorite, 
  setNextSong,
  setPreviousSong
} from '../../actions/song';
import { handlePlayPauseAction } from '../../actions/player';

import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TouchIcon from '../../components/TouchIcon';
import { LoadingView } from '../../components';


function PlayerView({
  currentSong, isFavorite, isPlaying, isSongLoading,
  addCurrentSongFavorite, toglePlayPause, setNextSong, setPreviousSong,
  navigation
}) {


  if (currentSong) {

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
  
          <Slider />
  
          <View style={styles.containerControls}>
            <TouchIcon
              icon={<IonIcon color={colors.greyLight} name="shuffle" />}
              onPress={() => null}
            />
            <View style={gStyle.flexRowCenterAlign}>
              <TouchIcon
                icon={<IonIcon color={colors.white} name="play-skip-back" />}
                iconSize={32}
                onPress={setPreviousSong}
              />
              <View style={gStyle.pH3}>
                {isSongLoading
                  ? <ActivityIndicator 
                      color={colors.white} 
                      size={68} />
                  : <TouchIcon
                    icon={<IonIcon color={colors.white} name={isPlaying ? 'play-circle' : 'pause-circle'} />}
                    iconSize={64}
                    onPress={toglePlayPause}
                  />
                }
              </View>
              <TouchIcon
                icon={<IonIcon color={colors.white} name="play-skip-forward" />}
                iconSize={32}
                onPress={setNextSong}
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

  return <View style={gStyle.container}>
    <LoadingView />
  </View>
}

const mapStateToProps = state => ({
  currentSong: state.song.currentSong,
  isFavorite: state.song.isCurrentSongFavorite,
  isPlaying: state.player.isPlaying,
  isSongLoading: state.player.isSongLoading
})

const mapDispatchToProps = dispatch => ({
  setNextSong: () => dispatch(setNextSong()),
  setPreviousSong: () => dispatch(setPreviousSong()),
  addCurrentSongFavorite: () => dispatch(addCurrentSongFavorite()),
  toglePlayPause: () => dispatch(handlePlayPauseAction())
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PlayerView)
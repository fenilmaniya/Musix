import React, { useEffect, useState } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { HorizontalList } from '../../containers';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { setPlaylist } from '../../actions/playlist';
import { setAlbum } from '../../actions/album';
import { setCurrentSong, setCurrentPlaylist } from '../../actions/song';

import styles from './styles';
import { colors, device, gStyle } from '../../constants';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function HomeView({ 
  radios, playlists, albums, history,
  setCurrentAlbum, setPlaylist, setCurrentSong, setCurrentPlaylist,
  navigation
}) {


  const [scrollY, setScrollY]=useState(new Animated.Value(0));
  
  const opacityIn = scrollY.interpolate({
    inputRange: [0, 128],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityOut = scrollY.interpolate({
    inputRange: [0, 88],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  return (
    <React.Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}
      <Animated.View
        style={[styles.containerHeader, { opacity: opacityOut }]}
      >
        <TouchableOpacity
          onPress={() => {
            if (player.isPlaying()) player.pause();
            else player.play();
          }}
        >
          <Icon name="cog" size={28} color={colors.white} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={gStyle.container}
      >
        <View style={gStyle.spacer11} />
        <HorizontalList data={radios} heading="Radio Station" onItemPress={() => null} />
        
        <HorizontalList 
          data={playlists} 
          heading="Featured Playlist" 
          onItemPress={(playlist) => {
            setPlaylist(playlist)
            navigation.navigate('PlaylistView')
          }} 
        />
        
        <HorizontalList 
          data={albums} 
          heading="New Release" 
          onItemPress={(album) => {
            setCurrentAlbum(album)
            navigation.navigate('AlbumView')
          }}
        />

        <HorizontalList 
          data={history}
          heading="Recently Played"
          onItemPress={(song, index) => {
            setCurrentSong(song);
            setCurrentPlaylist({
              playlist: history, 
              index: index
            });
            navigation.navigate('playerView');
          }}
        />
      </Animated.ScrollView>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  radios: state.app.defaultRadios,
  playlists: state.app.defaultPlaylist,
  albums: state.app.defaultAlbum,
  history: state.app.defaultHistory,
})

const mapDispatchToProps = dispatch => ({
  setPlaylist: (playlist) => dispatch(setPlaylist(playlist)),
  setCurrentAlbum: (album) => dispatch(setAlbum(album)),
  setCurrentSong: (song) => dispatch(setCurrentSong(song)),
  setCurrentPlaylist: (data) => dispatch(setCurrentPlaylist(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
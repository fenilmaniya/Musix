import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image, 
  Text,
  View
} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { connect } from 'react-redux';
import styles from './styles';
import { colors, device, gStyle, images } from '../../constants';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import LinearGradient from '../../components/LinearGradient';
import TouchIcon from '../../components/TouchIcon';
import TouchText from '../../components/TouchText';
import SongItem from '../../containers/SongItem';
import StickyPlayer from '../PlayerView/stickyPlayer';

//actions
import { setCurrentSong, setCurrentPlaylist } from '../../actions/song';

function AlbumView({
  currentAlbum, albumDetail,
  setCurrentSong, setCurrentPlaylist,
  navigation,
}) {
  const [scrollY, setScrollY]=useState(new Animated.Value(0))

  const stickyArray = device.web ? [] : [0];
  const headingRange = device.web ? [140, 200] : [230, 280];
  const shuffleRange = device.web ? [40, 80] : [40, 80];
  
  const opacityHeading = scrollY.interpolate({
    inputRange: headingRange,
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityShuffle = scrollY.interpolate({
    inputRange: shuffleRange,
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  return (
    <View style={gStyle.container}>

      <View style={styles.containerHeader}>
        <Animated.View
          style={[styles.headerLinear, { opacity: opacityHeading }]}
        >
          <LinearGradient fill={'#3d4c6c'} height={89} />
        </Animated.View>
        <View style={styles.header}>
          <TouchIcon
            icon={<Icon color={colors.white} name="chevron-left" />}
            onPress={() => navigation.goBack(null)}
          />
          <Animated.View style={{ opacity: opacityShuffle }}>
            <Text style={styles.headerTitle}>{currentAlbum.title}</Text>
          </Animated.View>
        </View>
      </View>

      <View style={styles.containerFixed}>
        <View style={styles.containerLinear}>
          <LinearGradient fill={'#3d4c6c'} />
        </View>
        <View style={styles.containerImage}>
          <Image source={{ uri: currentAlbum.image }} style={styles.image} />
        </View>
        <View style={styles.containerTitle}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {currentAlbum.title}
          </Text>
        </View>
        <View style={styles.containerAlbum}>
          <Text style={styles.albumInfo}>
            {`Album by`}
          </Text>
        </View>
      </View>

      <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={stickyArray}
          style={styles.containerScroll}
        >
          <View style={styles.containerSticky}>
            <Animated.View
              style={[
                styles.containerStickyLinear,
                { opacity: opacityShuffle }
              ]}
            >
              <LinearGradient fill={colors.black20} height={50} />
            </Animated.View>
            <View style={styles.containerShuffle}>
              <TouchText
                onPress={() => null}
                style={styles.btn}
                styleText={styles.btnText}
                text="Shuffle Play"
              />
            </View>
          </View>
          { albumDetail && albumDetail!=null && <View style={styles.containerSongs}>

            {albumDetail.list.map((song, index) => (
                <SongItem
                  key={index.toString()}
                  image={false}
                  item={song}
                  onPress={()=>{
                    
                    setCurrentSong(song);
                    setCurrentPlaylist({
                      playlist: albumDetail.list, 
                      index: index
                    });
                    navigation.navigate('playerView');
                  }}
                />
              ))}
          </View> }
          <View style={gStyle.spacer16} />
        </Animated.ScrollView>
        <StickyPlayer navigation={navigation}/> 
    </View>
  )
}

const mapStateToProps = state => ({
  currentAlbum: state.album.currentAlbum,
  albumDetail: state.album.currentAlbumDetail,
})

const mapDispatchToProps = dispatch => ({
  setCurrentSong: (song) => dispatch(setCurrentSong(song)),
  setCurrentPlaylist: (data) => dispatch(setCurrentPlaylist(data))
})


AlbumView.propTypes = {
  currentAlbum: PropTypes.object,
  albumDetail: PropTypes.object,
  navigation: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
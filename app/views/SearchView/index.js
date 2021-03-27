import React, { useState } from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  Text, 
  View
} from 'react-native';
import { connect } from 'react-redux'
import styles from './styles'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { colors, device, gStyle, screens } from '../../constants';
import SvgSearch from '../../components/icons/Svg.Search';

//actions
import { setAlbum, searchAlbums } from '../../actions/album';
import { setSearch } from '../../actions/search';
import { setCurrentSong, setCurrentPlaylist } from '../../actions/song';
import { searchArtist } from '../../actions/artist';
import { searchPlaylists } from '../../actions/playlist';

// components
import SongItem from '../../containers/SongItem';
import TouchIcon from '../../components/TouchIcon';
import SeeAllBtn from '../../components/SeeAllBtn';
import { LoadingView } from '../../components';

function Search({
  songs,
  searchArtist, searchAlbums, searchPlaylists,
  searchAction, setCurrentSong, setCurrentPlaylist,
  navigation
}) {

  const [searching, setSearching]=useState(false);
  const [searchText, setSearchText]=useState();
  const [scrollY, setScrollY]=useState(new Animated.Value(0));
  const [searchStart, setSearchStart]=useState(device.width - 48);
  const [searchEnd, setSearchEnd]=useState(searchStart - 40);

  const opacity = scrollY.interpolate({
    inputRange: [0, 48],
    outputRange: [searchStart, searchEnd],
    extrapolate: 'clamp'
  });

  return (
    <React.Fragment>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        style={gStyle.container}
      >
        <View style={gStyle.spacer11} />

        <View style={styles.containerSearchBar}>
          <Animated.View style={{ width: opacity }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => null}
              style={styles.searchPlaceholder}
            >
              <View style={gStyle.mR1}>
                <SvgSearch />
              </View>
              <TextInput
                autoFocus
                style={styles.searchInput}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={() => {
                  setSearching(true);
                  searchAction(searchText);
                }}
                placeholder={'Artists, songs or podcasts'}
                placeholderTextColor={colors.black}
                testID='search-message-view-input'
                autoCorrect={false}
                autoCapitalize='none'
                underlineColorAndroid='transparent'
                accessibilityLabel={'Artists, songs or podcasts'}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
        { songs && songs.length>0
          ? <>
            {
              songs.map((song, index) => 
                <SongItem
                  image={true}
                  onPress={() => {
                    setCurrentSong(song);
                    setCurrentPlaylist({
                      playlist: songs, 
                      index: index
                    });
                    navigation.navigate('playerView');
                  }}
                  item={song}
                /> 
              )
            }
            <SeeAllBtn
              type="Artist"
              onPress={() => {
                
                searchArtist(searchText)
                navigation.navigate(screens.artistListView)
              }}
            />
            <SeeAllBtn
              type="Album"
              onPress={() => {
                
                searchAlbums(searchText)
                navigation.navigate(screens.albumListView)
              }}
            />
            <SeeAllBtn
              type="Playlist"
              onPress={() => {
                
                searchPlaylists(searchText)
                navigation.navigate(screens.playlistListView)
              }}
            />
          </>
          : searching && <LoadingView styles={{ marginTop: 30, }} />
        }

      </Animated.ScrollView>

      <View style={styles.iconRight}>
        <TouchIcon
          icon={<Icon color={colors.white} name="microphone" />}
          onPress={() => null}
        />
      </View>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  albums: state.search.albums,
  artists: state.search.artists,
  songs: state.search.songs,
  playlists: state.search.playlists,
})

const mapDispatchToProps = dispatch => ({
  searchAction: (search) => dispatch(setSearch(search)),
  searchArtist: (search) => dispatch(searchArtist(search)),
  searchAlbums: (search) => dispatch(searchAlbums(search)),
  searchPlaylists: (search) => dispatch(searchPlaylists(search)),
  setCurrentSong: (song) => dispatch(setCurrentSong(song)),
  setCurrentAlbum: (album) => dispatch(setAlbum(album)),
  setCurrentPlaylist: (playlist) => dispatch(setCurrentPlaylist(playlist))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);

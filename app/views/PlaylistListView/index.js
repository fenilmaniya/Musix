import React from 'react';
import { 
  ScrollView, Text
} from 'react-native';
import { connect } from 'react-redux';
import PlaylistItem from './PlaylistItem';
import { setPlaylist } from '../../actions/playlist';
import { gStyle, screens, colors } from '../../constants';

function PlaylistListView({
  currentQuery, playlists,
  setPlaylist,
  navigation
}) {


  return (
    <ScrollView style={gStyle.container}>

      <Text style={{
        fontFamily: 'spotifyBold',
        fontSize: 30,
        margin: 20,
        color: colors.white
      }}> Search Result for '{ currentQuery }'</Text>
      {playlists.map((playlist, index) => (
        <PlaylistItem
          image={true}
          key={index.toString()}
          item={playlist}
          onPress={()=> {
            setPlaylist(playlist)
            navigation.navigate(screens.playlistView)
          }}
        />
      ))}
    </ScrollView> 
  )
}

const mapStateToProps = state => ({
  playlists: state.playlist.playlists,
  currentQuery: state.search.currentQuery
})

const mapDispatchToProps = dispatch => ({
  setPlaylist: (playlist) => dispatch(setPlaylist(playlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListView);
import React from 'react';
import { 
  ScrollView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import AlbumItem from './AlbumItem';
import { setAlbum } from '../../actions/album';
import { gStyle, screens, colors } from '../../constants';

function AlbumListView({
  currentQuery, albums,
  setCurrentAlbum,
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
      {albums.map((album, index) => (
        <AlbumItem
          image={true}
          key={index.toString()}
          item={album}
          onPress={()=> {
            setCurrentAlbum(album)
            navigation.navigate(screens.albumView)
          }}
        />
      ))}
    </ScrollView> 
  )
}

const mapStateToProps = state => ({
  currentQuery: state.search.currentQuery,
  albums: state.album.albums
})

const mapDispatchToProps = dispatch => ({
  setCurrentAlbum: (album) => dispatch(setAlbum(album)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListView);
import React from 'react';
import { 
  ScrollView, Text
} from 'react-native';
import { connect } from 'react-redux';
import ArtistItem from './ArtistItem';
import { gStyle, colors, screens } from '../../constants';

// actions
import { setArtist } from '../../actions/artist';

function ArtistListView({
  currentQuery, artists,
  setArtist,
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
      {artists.map((artist, index) => (
        <ArtistItem
          image={true}
          key={index.toString()}
          item={artist}
          onPress={()=> {
            setArtist(artist);
            navigation.navigate(screens.artistView)
          }}
        />
      ))}
    </ScrollView> 
  )
}

const mapStateToProps = state => ({
  artists: state.artist.artists,
  currentQuery: state.search.currentQuery
})

const mapDistpatchToProps = dispatch => ({
  setArtist: (artist) => dispatch(setArtist(artist))
})

export default connect(mapStateToProps, mapDistpatchToProps)(ArtistListView);
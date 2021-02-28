import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { colors, gStyle } from '../constants';

const LineSearchItem = ({ onPress, item }) => (
  <TouchableOpacity
    activeOpacity={gStyle.activeOpacity}
    onPress={onPress}
    style={styles.playlistItem}
  >
    <Image
      resizeMethod={'resize'}
      resizeMode={'cover'}
      style={styles.bgImage}
      source={{ uri: item.image}}
    />
    <Text style={styles.playlistTitle} numberOfLines={2}>{item.title}</Text>
  </TouchableOpacity>
);

LineSearchItem.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  playlistItem: {
    backgroundColor: '#999',
    borderRadius: 6,
    height: 98,
    flex: 1,
    marginBottom: 24,
    marginRight: 24,
  },
  bgImage: { 
    borderRadius: 6, 
    height: 98, 
    width: '100%', 
    flex: 1, 
    position: 'absolute'
  },
  playlistTitle: {
    ...gStyle.textSpotifyBold22,
    color: colors.white,
    paddingLeft: 12,
    paddingTop: 12
  }
});

export default LineSearchItem;

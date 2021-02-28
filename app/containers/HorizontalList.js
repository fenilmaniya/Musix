import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, gStyle, images } from '../constants';

const HorizontalList = ({ 
  data,
  heading, 
  tagline, 
  onItemPress 
}) => {
  
  return (
    data && data.length > 0  && <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {tagline && <Text style={styles.tagline}>{tagline}</Text>}

      <FlatList
        contentContainerStyle={styles.containerContent}
        data={data}
        horizontal
        keyExtractor={(item, idx) => `${heading.replace(' ', '_')}${idx}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            onPress={() => onItemPress(item, index)}
            style={styles.item}
          >
            <View style={styles.image}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
            </View>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
};

HorizontalList.defaultProps = {
  heading: null,
  tagline: null
};

HorizontalList.propTypes = {
  data: PropTypes.array.isRequired,
  heading: PropTypes.string,
  tagline: PropTypes.string,
  onItemPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    width: '100%'
  },
  containerContent: {
    paddingLeft: 16
  },
  heading: {
    ...gStyle.textSpotifyBold18,
    color: colors.white,
    paddingBottom: 6,
    textAlign: 'center'
  },
  tagline: {
    ...gStyle.textSpotify12,
    color: colors.greyInactive,
    paddingBottom: 6,
    textAlign: 'center'
  },
  item: {
    marginRight: 16,
    width: 148
  },
  image: {
    backgroundColor: colors.greyLight,
    height: 148,
    width: 148
  },
  title: {
    ...gStyle.textSpotifyBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center'
  }
});

export default HorizontalList;
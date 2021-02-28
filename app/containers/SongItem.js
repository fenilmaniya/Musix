import React from "react"
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from "react-native"
import { connect } from 'react-redux'
import FastImage, { ImageStyle } from "react-native-fast-image"
import Animated from "react-native-reanimated"
import UiUtils from "../utils/UiUtils";
import { colors } from "../constants";

export const MARGIN_HORIZONTAL = 16

const clock = new Animated.Clock()
const opacityAnim = UiUtils.runTiming(clock, 0, 1, 500)

const SongItem = React.memo(
  ({
    item,
    image,
    onPress,
    coverStyle,
    containerStyle,
    currentSong
  }) => {
    const scale = new Animated.Value(1)

    return (
      <TouchableOpacity
        onPressIn={() =>
          Animated.timing(scale, UiUtils.btnScaleAnim.in).start()
        }
        onPressOut={() =>
          Animated.timing(scale, UiUtils.btnScaleAnim.out).start()
        }
        onPress={onPress}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacityAnim,
              transform: [{ scale }],
            },
            containerStyle,
          ]}>
          { image && image==true && <FastImage
            source={{
              uri: item.image,
            }}
            style={[
              styles.cover,
              {
                borderRadius: item.type === "Artist" ? 27 : 0,
              },
              coverStyle,
            ]}
          /> }
          <View style={styles.itemInfoContainer}>
            <Text numberOfLines={1} style={{
              ...styles.name,
              color: currentSong?.id==item?.id ? colors.green : colors.white 
            }}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.type}>
              {item.subtitle}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  },
)

SongItem.displayName = "SongItem"

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: MARGIN_HORIZONTAL,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 3,
  },
  cover: {
    height: 54,
    width: 54,
  },
  itemInfoContainer: {
    flexDirection: "column",
    marginHorizontal: 12,
    flex: 1,
    marginTop: 2,
  },
  name: {
    flex: 1,
    color: colors.darkWhite,
    letterSpacing: 0.8,
    fontSize: 16,
  },
  type: {
    flex: 1,
    fontWeight: "normal",
    color: "#B9B9B9",
    letterSpacing: 0.8,
    fontSize: 14,
  },
})

const mapStateToProps = state => ({
  currentSong: state.song.currentSong,
})

export default connect(mapStateToProps)(SongItem)

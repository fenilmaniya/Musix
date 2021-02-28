import { StyleSheet } from 'react-native';
import { colors, } from '../../../constants';
export const PLAYER_HEIGHT = 50

export default styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.tabBar,
    height: PLAYER_HEIGHT,
    width: "100%",
    zIndex: 1,
    borderBottomColor: colors.tabBar,
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: PLAYER_HEIGHT,
    height: PLAYER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tabBar,
    zIndex: -1,
  },
  heartIcon: {
    bottom: 1,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 2,
    letterSpacing: 0.4,
    zIndex: -2,
  },
  artist: {
    fontWeight: "normal",
    fontSize: 11,
    color: colors.lightGrey,
    zIndex: -2,
  },
  playIcon: {
    color: colors.white,
    top: -2,
    right: -4,
  },
  controlsContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
    zIndex: -1,
  },
  progressBar: {
    position: "absolute",
    top: -2,
    backgroundColor: colors.white,
    height: 2,
    zIndex: 2,
  },
  progressBarBackground: {
    position: "absolute",
    top: -2,
    backgroundColor: "#3E3E3E",
    width: "100%",
    height: 3,
  },
})

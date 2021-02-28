import React from "react"
import { Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../constants"
import Animated from "react-native-reanimated"
import UiUtils from "../utils/UiUtils";

const MARGIN_HORIZONTAL = 14
const SeeAllBtn = React.memo(({type}) => {
    const scale = new Animated.Value(1)

    return (
      <TouchableOpacity
        onPressIn={() =>
          Animated.timing(scale, UiUtils.btnScaleAnim.in).start()
        }
        onPressOut={() =>
          Animated.timing(scale, UiUtils.btnScaleAnim.out).start()
        }
        style={styles.btnContainer}>
        <Animated.View
          style={[
            {
              transform: [{ scale }],
            },
            styles.container,
          ]}>
          <Text style={styles.seeAll}>See all {type?.toLowerCase()}s</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 14,
  },

  container: {
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  seeAll: {
    color: colors.darkWhite,
    letterSpacing: 0.8,
    fontSize: 16,
  },
})

SeeAllBtn.displayName = "SeeAllBtn"

export default SeeAllBtn

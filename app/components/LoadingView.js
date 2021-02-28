import React from "react"
import { ActivityIndicator } from "react-native"
import { colors } from "../constants";

const LoadingView = ({styles}) => (
    <ActivityIndicator
      animating
      size={30}
      color={colors.green}
      
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        styles
      ]}
    />
)
export default LoadingView

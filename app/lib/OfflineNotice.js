import React, { PureComponent } from 'react';
import { Text, Dimensions, StyleSheet, Animated } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');

class OfflineNotice extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    }
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });

  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { isConnected } = this.state;
    
    return (
      !isConnected && 
      <Animated.View 
        style={{
          ...styles.offlineContainer,
        }}
      >
        <Text style={styles.offlineText}> { ` No Internet Connection ` } </Text>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    width,
  },
  offlineText: { 
    color: '#fff'
  }
});
export default OfflineNotice;
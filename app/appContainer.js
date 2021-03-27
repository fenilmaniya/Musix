import React, { useEffect, useContext } from 'react'
import Sound from 'react-native-sound';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { withPlayer, PlayerContext } from './player';
import InsideStack from './stacks/InsideStack';

import { setNextSong } from './actions/song';
import { setCurrentPosition, songLoaded } from './actions/player';

const Stack=createStackNavigator();
function AppContainer({
  currentUrl, isPlaying,
  setCurrentPosition, setSongLoaded, setNextSong
}) {
  const {player, setPlayer}=useContext(PlayerContext);

  useEffect(() => {
    if (currentUrl) {
      if (player) {
        player.pause();
        player.release();
      }

      let nPlayer = new Sound(currentUrl.auth_url, Sound.MAIN_BUNDLE, (err) => {
        if (err) {
          console.error('error during init player :: ', err);
        }

        setSongLoaded()

        nPlayer.play((success) => {
          if (success) setNextSong()
        })
      })

      setPlayer(nPlayer)
    }
  }, [currentUrl])

  useEffect(() => {
    if (player) {
      let playerInterval= setInterval(() => {
        player.getCurrentTime((sec, isPlaying) => {
          if (isPlaying) setCurrentPosition(Math.floor(sec))
        })
      }, 1000);
  
      return () => clearInterval(playerInterval)
    }
  }, [player])

  useEffect(() => {
    if (!player) return;
    if (isPlaying) player.pause();
    else player.play();

  }, [isPlaying])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen
          name='InsideStack'
          component={InsideStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  currentUrl: state.player.currentUrl,
  isPlaying: state.player.isPlaying
})

const mapDispatchToProps = dispatch => ({
  setNextSong: () => dispatch(setNextSong()),
  setCurrentPosition: (data) => dispatch(setCurrentPosition(data)),
  setSongLoaded: () => dispatch(songLoaded())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withPlayer(AppContainer));
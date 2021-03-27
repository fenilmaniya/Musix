import { PLAYER } from './actionTypes';

export function initPlayer(data) {
  return {
    type: PLAYER.INIT_PLAYER,
    data
  }
}

export function songLoaded() {
  return {
    type: PLAYER.SONG_LOADED
  }
}

export function handlePlayPauseAction() {
  return {
    type: PLAYER.HANDLE_PLAY_PAUSE
  }
}

export function setCurrentPosition(data) {
  return {
    type: PLAYER.SET_CURRENT_POSITION,
    data
  }
}
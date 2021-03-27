import { SONG } from './actionTypes';

export function setCurrentSong(data) {
  return {
    type: SONG.SET_CURRENT_SONG,
    data
  }
}

export function setCurrentPlaylist(data) {
  return {
    type: SONG.SET_CURRENT_PLAYLIST,
    data
  }
}

export function setPreviousSong() {
  return {
    type: SONG.SET_PREVIOUS_SONG
  }
}

export function setNextSong() {
  return {
    type: SONG.SET_NEXT_SONG
  }
}

export function setCurrentIndex(data) {
  return {
    type: SONG.SET_CURRENT_INDEX,
    data
  }
}

export function setCurrentSongFavorite(data) {
  return {
    type: SONG.SET_CURRENT_SONG_FAVORITE,
    data
  }
}

export function addCurrentSongFavorite() {
  return {
    type: SONG.ADD_CURRENT_SONG_FAVORITE
  }
}
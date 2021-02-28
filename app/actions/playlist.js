import { PLAYLIST } from './actionTypes';

export function setPlaylist(data) {
  return {
    type: PLAYLIST.SET_CURRENT_PLAYLIST,
    data
  }
}

export function setCurrentPlaylistDetail(data) {
  return {
    type: PLAYLIST.SET_CURRENT_PLAYLIST_DETAILS,
    data
  }
}
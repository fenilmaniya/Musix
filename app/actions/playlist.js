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

export function searchPlaylists(data) {
  return {
    type: PLAYLIST.SEARCH_PLAYLISTS,
    data
  }
}

export function setPlaylists(data) {
  return {
    type: PLAYLIST.SET_PLAYLISTS,
    data: data
  }
}
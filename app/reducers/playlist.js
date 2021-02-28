import { PLAYLIST } from '../actions/actionTypes';
const is = {
  currentPlaylist: null,
  currentPlaylistDetail: null
}

export default function playlist(state=is, action) {
  switch(action.type) {
    case PLAYLIST.SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.data,
        currentPlaylistDetail: null
      }
    case PLAYLIST.SET_CURRENT_PLAYLIST_DETAILS:
      return {
        ...state,
        currentPlaylistDetail: action.data
      }
    default:
      return state;
  }
}
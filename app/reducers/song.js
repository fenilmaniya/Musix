import { SONG } from '../actions/actionTypes';
const is ={
  currentSong: null,
  currentPlaylist: [],
  currentIndex: 0,
  isCurrentSongFavorite: false
}

export default function song(state=is, action) {
  switch(action.type) {
    case SONG.SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.data,
        isCurrentSongFavorite: false
      }
    case SONG.SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.data.playlist,
        currentIndex: action.data.index
      }
    case SONG.SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.data,
      }
    case SONG.SET_CURRENT_SONG_FAVORITE:
      return {
        ...state,
        isCurrentSongFavorite: action.data
      }
    default:
      return state;
  }
}
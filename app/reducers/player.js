import { PLAYER, SONG } from '../actions/actionTypes';

const is={
  isPlaying: false,
  currentPosition: 0,
  currentUrl: undefined,
  isSongLoading: true
}

export default function player(state=is, action) {
  switch(action.type) {
    case PLAYER.INIT_PLAYER:
      return {
        ...state,
        currentUrl: action.data,
        isSongLoading: true,
      }
    case PLAYER.SONG_LOADED:
      return {
        ...state,
        isSongLoading: false,
      }
    case PLAYER.HANDLE_PLAY_PAUSE:
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    case PLAYER.SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.data
      }
    case SONG.SET_NEXT_SONG:
      return {
        ...state,
        isPlaying: false,
        currentPosition: 0,
      }
    default:
      return state;
  }
}
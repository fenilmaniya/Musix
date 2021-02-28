import { APP } from '../actions/actionTypes';
const is = {
  defaultRadios: [],
  defaultPlaylist: [],
  defaultAlbum: [],
  defaultHistory: []
}

export default function app(state=is, action) {
  switch (action.type) {
    case APP.SET_DEFAULTS:
      return {
        ...state,
        defaultRadios: action.data?.radio,
        defaultPlaylist: action.data?.playlist,
        defaultAlbum: action.data?.album,
        defaultHistory: action.data?.history
      }
    default:
			return state;
  }
}
import { ARTIST } from '../actions/actionTypes';

const is = {
  artists: [],
  artistDetails: undefined
}

export default function artist(state=is, action) {
  switch(action.type) {
    case ARTIST.SET_ARTISTS:
      return {
        ...state,
        artists: action.data
      }
    case ARTIST.SET_ARTIST_DETAILS:
      return {
        ...state,
        artistDetails: action.data
      }
    default:
      return state;
  }
}
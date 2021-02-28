import { SEARCH } from '../actions/actionTypes';

const is={
  currentQuery: null,
  albums: [],
  artists: [],
  songs: [],
  playlists: [],
}

export default function search(state=is, action) {
  switch (action.type) {
    case SEARCH.SET_SEARCH:
      return {
        ...state,
        currentQuery: action.data,
        albums: [],
        artists: [],
        songs: [],
        playlists: [],
      }
    case SEARCH.SET_SEARCH_OPT:
      return {
        ...state,
        songs: action.data?.songs.data ?? [],
      }
    default:
			return state;
  }
}
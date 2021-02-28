import { ALBUM } from '../actions/actionTypes'
const is={
  currentAlbum: null,
  currentAlbumDetail: null
}

export default function album(state=is, action) {
  switch(action.type) {
    case ALBUM.SET_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: action.data,
        currentAlbumDetail: null
      }
    case ALBUM.SET_CURRENT_ALBUM_DETAILS:
      return {
        ...state,
        currentAlbumDetail: action.data
      }
    default:
      return state;
  }
}

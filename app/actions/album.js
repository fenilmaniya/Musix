import { ALBUM } from './actionTypes';

export function setAlbum(data) {
  return {
    type: ALBUM.SET_CURRENT_ALBUM,
    data
  }
}

export function setAlbumDetail(data) {
  return {
    type: ALBUM.SET_CURRENT_ALBUM_DETAILS,
    data
  }
}
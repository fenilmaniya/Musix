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

export function searchAlbums(data) {
  return {
    type: ALBUM.SEARCH_ALBUM,
    data: data
  }
}

export function setAlbums(data) {
  return {
    type: ALBUM.SET_ALBUMS,
    data
  }
}
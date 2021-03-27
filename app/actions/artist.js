import { ARTIST } from './actionTypes';

export function searchArtist(data) {
  return {
    type: ARTIST.SEARCH_ARTISTS,
    data: data
  }
}

export function setArtists(data) {
  return {
    type: ARTIST.SET_ARTISTS,
    data: data
  }
}

export function setArtist(data) {
  return {
    type: ARTIST.SET_ARTIST,
    data: data
  }
}

export function setArtistDetails(data) {
  return {
    type: ARTIST.SET_ARTIST_DETAILS,
    data: data
  }
}
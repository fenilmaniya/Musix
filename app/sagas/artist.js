import { ARTIST } from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { apiGet } from '../api/apiFetch';
import { getOtherSearchParams, getArtistDetailsParams } from '../config/urls';
import { setArtists, setArtistDetails } from '../actions/artist';

const setArtist = function* setArtist({data}) {
  const artistDetails=yield call(apiGet, getArtistDetailsParams(data.perma_url));
  console.log(artistDetails)
  yield put(setArtistDetails(artistDetails))
}

const searchArtist = function* searchArtist({data}) {
  const artists=yield call(apiGet, getOtherSearchParams('Artist', data));
  console.log(artists);
  yield put(setArtists(artists.results));
 
}

const root = function* root() {
  yield takeLatest(ARTIST.SEARCH_ARTISTS, searchArtist);
  yield takeLatest(ARTIST.SET_ARTIST, setArtist);
}

export default root;
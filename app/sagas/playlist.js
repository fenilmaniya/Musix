import { call, put, takeLatest } from 'redux-saga/effects';
import { PLAYLIST } from '../actions/actionTypes';
import { setCurrentPlaylistDetail, setPlaylists } from '../actions/playlist';
import { apiGet } from '../api/apiFetch';
import { getPlaylistDetailsParams, getOtherSearchParams } from '../config/urls';

const setCurrentPlaylist = function* setCurrentPlaylist({data}) {
  const playlist=yield call(apiGet, getPlaylistDetailsParams(data.perma_url))
  yield put(setCurrentPlaylistDetail(playlist));
}

const searchPlaylist = function* searchPlaylist({data}) {
  const playlists=yield call(apiGet, getOtherSearchParams('Playlist', data));
  console.log(playlists);
  yield put(setPlaylists(playlists.results));
 
}

const root = function* root() {
  yield takeLatest(PLAYLIST.SET_CURRENT_PLAYLIST, setCurrentPlaylist);
  yield takeLatest(PLAYLIST.SEARCH_PLAYLISTS, searchPlaylist);
}
export default root;
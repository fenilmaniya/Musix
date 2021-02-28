import { call, put, takeLatest } from 'redux-saga/effects';
import { PLAYLIST } from '../actions/actionTypes';
import { setCurrentPlaylistDetail } from '../actions/playlist';
import { apiGet } from '../api/apiFetch';
import { getPlaylistDetailsParams } from '../config/urls';

const setCurrentPlaylist = function* setCurrentPlaylist({data}) {
  const playlist=yield call(apiGet, getPlaylistDetailsParams(data.perma_url))
  yield put(setCurrentPlaylistDetail(playlist));
}

const root = function* root() {
  yield takeLatest(PLAYLIST.SET_CURRENT_PLAYLIST, setCurrentPlaylist);
}
export default root;
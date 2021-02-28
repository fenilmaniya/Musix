import { call, put, takeLatest } from 'redux-saga/effects';
import { ALBUM } from '../actions/actionTypes'
import { setAlbumDetail as setAlbumDetailAction } from '../actions/album';
import { apiGet } from '../api/apiFetch';
import { getAlbumDetailParams } from '../config/urls';
import { getAlbumDetails, saveAlbumDetail } from '../utils/dbUtils';

const setCurrentAlbum = function* setCurrentAlbum({data}) {
  let albumDetail=yield call(getAlbumDetails, data.id);
  if (!albumDetail) {
    albumDetail=yield call(apiGet, getAlbumDetailParams(data.id));
    saveAlbumDetail(albumDetail);
  }
  yield put(setAlbumDetailAction(albumDetail));
}

const root = function* root() {
  yield takeLatest(ALBUM.SET_CURRENT_ALBUM, setCurrentAlbum);
}

export default root;

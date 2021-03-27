import { call, put, takeLatest } from 'redux-saga/effects';
import { ALBUM } from '../actions/actionTypes'
import { setAlbumDetail as setAlbumDetailAction, setAlbums } from '../actions/album';
import { apiGet } from '../api/apiFetch';
import { getAlbumDetailParams, getOtherSearchParams } from '../config/urls';
import { getAlbumDetails, saveAlbumDetail } from '../utils/dbUtils';

const setCurrentAlbum = function* setCurrentAlbum({data}) {
  let albumDetail=yield call(getAlbumDetails, data.id);
  if (!albumDetail) {
    albumDetail=yield call(apiGet, getAlbumDetailParams(data.id));
    saveAlbumDetail(albumDetail);
  }
  yield put(setAlbumDetailAction(albumDetail));
}

const searchAlbum = function* searchAlbum({data}) {
  const albums=yield call(apiGet, getOtherSearchParams('Album', data));
  yield put(setAlbums(albums.results));
 
}

const root = function* root() {
  yield takeLatest(ALBUM.SET_CURRENT_ALBUM, setCurrentAlbum);
  yield takeLatest(ALBUM.SEARCH_ALBUM, searchAlbum);
}

export default root;

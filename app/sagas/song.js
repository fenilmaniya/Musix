import { SONG } from '../actions/actionTypes';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import { setCurrentSong, setCurrentIndex, setCurrentSongFavorite } from '../actions/song';
import { checkIsFavorite, addSongFavorite, addSongHistory } from '../utils/dbUtils';
import { getSongUrlParams } from '../config/urls';
import { apiGet } from '../api/apiFetch';

const setNextSong = function* setNextSong() {
  const {currentIndex, currentPlaylist}=yield select(state => state.song);
  if (currentPlaylist.length>0 && currentIndex<currentPlaylist.length) {
    let newIndex=currentIndex==currentPlaylist.length-1?0:currentIndex+1;
    yield put(setCurrentSong(currentPlaylist[newIndex]));
    yield put(setCurrentIndex(newIndex));
  }
}

const setCurrentSongAttr = function* setCurrentSongAttr({data}) {
  const isFavorite=yield call(checkIsFavorite, data.id);
  if (isFavorite) yield put(setCurrentSongFavorite(isFavorite))

  // const songUrl=yield call(apiGet, getSongUrlParams(data.more_info.encrypted_media_url));
  // console.log(songUrl);

  addSongHistory(data);
}

const addCurrentSongFavorite = function* addCurrentSongFavorite() {
  const { currentSong }=yield select(state => state.song);
  const isFavorite=yield call(addSongFavorite, currentSong);
  yield put(setCurrentSongFavorite(isFavorite))
}

const root = function* root() {
  yield takeLatest(SONG.SET_NEXT_SONG, setNextSong);
  yield takeLatest(SONG.SET_CURRENT_SONG, setCurrentSongAttr);
  yield takeLatest(SONG.ADD_CURRENT_SONG_FAVORITE, addCurrentSongFavorite);
}
export default root;
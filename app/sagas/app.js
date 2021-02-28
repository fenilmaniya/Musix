import { APP } from '../actions/actionTypes';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { setAppDefaults } from '../actions/app';
import { apiGet } from '../api/apiFetch';
import { 
  defaultRadioParams, 
  defaultPlaylistParams, 
  defaultAlbumParams 
} from '../config/urls';
import { getDefaults, setDefaults } from '../utils/dbUtils';

const appStart = function* appStart() {
  const savedDefaults=yield call(getDefaults, 'playlist');
  let {radio_station, playlist, album, song}=savedDefaults;

  if (!radio_station) {
    radio_station=yield call(apiGet, defaultRadioParams);
    setDefaults(radio_station, 'radio');
  } if (!playlist) {
    playlist=yield call(apiGet, defaultPlaylistParams);
    setDefaults(playlist, 'playlist');
  } if (!album) {
    album=yield call(apiGet, defaultAlbumParams);
    setDefaults(album, 'album');
  } if (!song) {
    song=[];
  }

  yield put(setAppDefaults({
    radio: radio_station, 
    playlist: playlist, 
    album: album,
    history: song
  }))
}

const root = function* root() {
  yield takeLatest(APP.APP_START, appStart);
}
export default root;
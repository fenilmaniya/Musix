import { call, put, takeLatest } from 'redux-saga/effects';
import { RADIO } from '../actions/actionTypes';
import { getStationIdParams, getStationSongParams } from '../config/urls';
import { apiGet } from '../api/apiFetch';
import { setRadioStation, getSongFromStation } from '../actions/radio';
import { setCurrentSong } from '../actions/song';

const setRadio = function* setRadio({data}) {
  const station=yield call(apiGet, getStationIdParams(
    data.more_info?.featured_station_type,
    data.title?data.title:data.name,
  ));
  yield put(setRadioStation(station.stationid))
  yield put(getSongFromStation(station.stationid));
}

const getSong = function* getSong({data}) {
  const song=yield call(apiGet, getStationSongParams(data));
  yield put(setCurrentSong(song.song));
}

const root = function* root() {
  yield takeLatest(RADIO.SET_RADIO, setRadio);
  yield takeLatest(RADIO.GET_SONG_FROM_STATION, getSong)
}
export default root;
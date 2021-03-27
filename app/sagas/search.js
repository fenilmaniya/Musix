import { call, put, takeLatest } from 'redux-saga/effects';
import { SEARCH } from '../actions/actionTypes';
import { setSearchOpt } from '../actions/search';
import { apiGet } from '../api/apiFetch';
import { getSongSearchParams } from '../config/urls';

const setSearch = function* setSearch({data}) {
  const searchOpt=yield call(apiGet, getSongSearchParams(data));
  yield put(setSearchOpt({songs: {data: searchOpt.results}}));
}

const root = function* root() {
  yield takeLatest(SEARCH.SET_SEARCH, setSearch);
}

export default root;
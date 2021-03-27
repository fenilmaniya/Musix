import { all } from 'redux-saga/effects';

import app from './app';
import artist from './artist';
import radio from './radio';
import album from './album';
import search from './search';
import playlist from './playlist';
import song from './song';

const root = function* root() {
  yield all([
    app(),
    artist(),
    radio(),
    album(),
    search(),
    playlist(),
    song()
  ])
}

export default root;
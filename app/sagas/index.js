import { all } from 'redux-saga/effects';

import app from './app';
import radio from './radio';
import album from './album';
import search from './search';
import playlist from './playlist';
import song from './song';

const root = function* root() {
  yield all([
    app(),
    radio(),
    album(),
    search(),
    playlist(),
    song()
  ])
}

export default root;
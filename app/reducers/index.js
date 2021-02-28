import { combineReducers } from 'redux';

import app from './app';
import radio from './radio';
import album from './album';
import playlist from './playlist';
import search from './search';
import song from './song';
import player from './player';

export default combineReducers({
  app,
  radio,
  album,
  search,
  playlist,
  song,
  player
})
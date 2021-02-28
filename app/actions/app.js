import { APP } from './actionTypes';

export function appStart() {
  return {
    type: APP.APP_START
  }
}

export function setAppDefaults(data) {
  return {
    type: APP.SET_DEFAULTS,
    data
  }
}
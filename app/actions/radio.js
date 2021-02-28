import { RADIO } from './actionTypes';

export function getDefaultRadios() {
  return {
    type: RADIO.GET_DEFAULT_RADIO
  }
}

export function setRadios(data) {
  return {
    type: RADIO.SET_RADIO,
    data
  }
}
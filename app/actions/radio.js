import { RADIO } from './actionTypes';

export function getDefaultRadios() {
  return {
    type: RADIO.GET_DEFAULT_RADIO
  }
}

export function setRadios(data) {
  return {
    type: RADIO.SET_RADIOS,
    data
  }
}

export function setRadio(data) {
  return {
    type: RADIO.SET_RADIO,
    data
  }
}

export function setRadioStation(data) {
  return {
    type: RADIO.SET_RADIO_STATION,
    data
  }
}

export function getSongFromStation(data) {
  return {
    type: RADIO.GET_SONG_FROM_STATION,
    data
  }
}
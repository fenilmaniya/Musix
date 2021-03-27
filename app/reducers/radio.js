import { RADIO } from '../actions/actionTypes';

const is={
  defaultRadio: [],
  station_id: undefined
}

export default function radio(state=is, action) {
  switch (action.type) {
    case RADIO.SET_RADIO_STATION:
      return {
        ...state,
        station_id: action.data
      }
    default:
			return state;
  }
}
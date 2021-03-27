import { SEARCH } from './actionTypes';

export function setSearch(data) {
  return {
    type: SEARCH.SET_SEARCH,
    data
  }
}

export function setSearchOpt(data) {
  return {
    type: SEARCH.SET_SEARCH_OPT,
    data
  }
}
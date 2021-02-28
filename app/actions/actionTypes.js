function createRequestTypes(base, types = defaultTypes) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}


export const APP = createRequestTypes('APP', [
  'APP_START',
  'GET_DEFAULTS',
  'SET_DEFAULTS'
]);

export const RADIO = createRequestTypes('RADIO', [
  'SET_RADIO',
])

export const ALBUM = createRequestTypes('ALBUM', [
  'SET_CURRENT_ALBUM',
  'SET_CURRENT_ALBUM_DETAILS'
])

export const PLAYLIST = createRequestTypes('PLAYLIST', [
  'SET_CURRENT_PLAYLIST',
  'SET_CURRENT_PLAYLIST_DETAILS'
])

export const SEARCH = createRequestTypes('SEARCH', [
  'SET_SEARCH',
  'SET_SEARCH_OPT',
])

export const SONG = createRequestTypes('SONG', [
  'SET_CURRENT_SONG',
  'SET_CURRENT_PLAYLIST',
  'SET_CURRENT_SONG_FAVORITE',
  'ADD_CURRENT_SONG_FAVORITE',
  'SET_NEXT_SONG',
  'SET_CURRENT_INDEX'
])

export const PLAYER = createRequestTypes('PLAYER', [
  'SET_PLAYER'
])
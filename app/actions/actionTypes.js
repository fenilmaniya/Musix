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
  'SET_RADIOS',
  'SET_RADIO_STATION',
  'GET_SONG_FROM_STATION',
])

export const ALBUM = createRequestTypes('ALBUM', [
  'SEARCH_ALBUM',
  'SET_ALBUMS',
  'SET_CURRENT_ALBUM',
  'SET_CURRENT_ALBUM_DETAILS'
])

export const PLAYLIST = createRequestTypes('PLAYLIST', [
  'SEARCH_PLAYLISTS',
  'SET_PLAYLISTS',
  'SET_CURRENT_PLAYLIST',
  'SET_CURRENT_PLAYLIST_DETAILS'
])

export const SEARCH = createRequestTypes('SEARCH', [
  'SET_SEARCH',
  'SET_SEARCH_OPT',
])

export const ARTIST = createRequestTypes('SEARCH', [
  'SEARCH_ARTISTS',
  'SET_ARTISTS',
  'SET_ARTIST',
  'SET_ARTIST_DETAILS'
])

export const SONG = createRequestTypes('SONG', [
  'SET_CURRENT_SONG',
  'SET_CURRENT_PLAYLIST',
  'SET_CURRENT_SONG_FAVORITE',
  'ADD_CURRENT_SONG_FAVORITE',
  'SET_PREVIOUS_SONG',
  'SET_NEXT_SONG',
  'SET_CURRENT_INDEX'
])

export const PLAYER = createRequestTypes('PLAYER', [
  'INIT_PLAYER',
  'HANDLE_PLAY_PAUSE',
  'SET_CURRENT_POSITION',
  'SONG_LOADED'
])
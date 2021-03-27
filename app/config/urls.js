export const BASE_URL = 'https://www.jiosaavn.com/api.php';

export const defaultParams = {
  api_version: 4,
  _format: "json",
  _marker: 0,
  ctx: "web6dot0",
}

export const defaultRadioParams = {
  ...defaultParams,
  __call: 'webradio.getFeaturedStations'
}

export const defaultPlaylistParams = {
  ...defaultParams,
  __call: "content.getCharts"
}

export const defaultAlbumParams = {
  ...defaultParams,
  n: 20,
  __call: "content.getAlbums"
}

export const getAlbumDetailParams = (albumId) => {
  return {
    ...defaultAlbumParams,
    __call: "content.getAlbumDetails",
    albumid: albumId
  }
}

export const getPlaylistDetailsParams = (perma_url) => {
  return {
    ...defaultAlbumParams,
    __call: "webapi.get",
    type: "playlist",
    p: 1,
    n: 20, 
    includeMetaTags: 0,
    token: perma_url.split('/')[5]
  }
}

export const getArtistDetailsParams = (perma_url) => {
  return {
    ...defaultAlbumParams,
    __call: "webapi.get",
    token: perma_url.split('/')[5],
    type: "artist",
    p: 1,
    n_song: 10,
    n_album: 10,
    sub_type: '',
  }
}

export const getStationIdParams = (stationName, name, pid = '') => {
  return {
    ...defaultParams,
    language: 'hindi', 
    pid: pid,
    mode: "",
    artistid: "",
    __call: `webradio.create${stationName.charAt(0).toUpperCase() + stationName.slice(1)}Station`,
    name: name,
    query: stationName==="artist"?name:"" 
  }
}

export const getStationSongParams = (stationId) => {
  return {
    ...defaultParams,
    __call: "webradio.getSong",
    stationid: encodeURIComponent(stationId) 
  }
}

export const getSearchParams = (query) => {
  return {
    ...defaultAlbumParams,
    __call: "autocomplete.get",
    n: 10,
    'query': query
  }
}

export const getSongSearchParams = (query) => {
  return {
    ...defaultAlbumParams,
    __call: "search.getResults",
    p: 1,
    n: 20,
    q: query
  }
}

export const getOtherSearchParams = (action, query) => {
  return {
    ...defaultAlbumParams,
    __call: `search.get${action}Results`,
    p: 1,
    n: 20,
    q: query

  }
}

export const getSongUrlParams = (enc_url) => {
  return {
    ...defaultParams,
    __call: "song.generateAuthToken",
    bitrate: 256,
    url: encodeURIComponent(enc_url)
  }
}
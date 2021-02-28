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

export const getSongUrlParams = (enc_url) => {
  return {
    ...defaultParams,
    __call: "song.generateAuthToken",
    bitrate: 256,
    url: encodeURIComponent(enc_url)
  }
}
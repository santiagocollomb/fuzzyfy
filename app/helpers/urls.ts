export const AUTH_URLS = {
  authorize: (
    clientId: string,
    redirectUri: string,
    scope: string,
    state: string
  ) =>
    `/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`,
  requestToken: "/api/token",
};

export const ALBUM_URLS = {
  getAlbum: (albumId: string) => `/albums/${albumId}`,
  getAlbums: (ids: string) => `/albums?ids=${ids}`,
  getAlbumTracks: (trackId: string) => `/albums/${trackId}/tracks}`,
  getSavedAlbums: "/me/albums",
  saveAlbum: "/me/albums",
  removeAlbums: "/me/albums",
};

export const ARTIST_URLS = {
  getArtist: (artistId: string) => `/artists/${artistId}`,
  getArtistTopTracks: (artistId: string) =>
    `/artists/${artistId}/top-tracks?market=AR`,
  getArtistRelated: (artistId: string) =>
    `/artists/${artistId}/related-artists`,
};

export const USER_URLS = {
  getProfile: "/me",
  getItems: (type: string, limit = 10, offset = 0) =>
    `/me/top/${type}?limit=${limit}&offset=${offset}`,
  getFollowedArtist: "/me/following",
};

export const SEARCH_URLS = {
  searchForItem: (query: string, type: string, limit = 5, offset = 0) => {
    let url = `/search?q=${query}&limit=${limit}&offset=${offset}`;
    if (type) url += `&type=${type}`;
    else url += "&type=artist,track";
    return url;
  },
};

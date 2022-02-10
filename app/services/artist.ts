import axios from "axios";
import { API_CONSTS } from "~/helpers/consts";
import { ARTIST_URLS } from "~/helpers/urls";

export const getArtist = async (artistId: string, accessToken: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const artist = await axios(
      `${API_CONSTS.apiUrl}${ARTIST_URLS.getArtist(artistId)}`,
      { headers }
    );
    return artist.data;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const getArtistTopTracks = async (
  artistId: string,
  accessToken: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const artistTopTracks = await axios(
      `${API_CONSTS.apiUrl}${ARTIST_URLS.getArtistTopTracks(artistId)}`,
      { headers }
    );
    return artistTopTracks.data.tracks;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const getArtistRelated = async (
  artistId: string,
  accessToken: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const artistTopTracks = await axios(
      `${API_CONSTS.apiUrl}${ARTIST_URLS.getArtistRelated(artistId)}`,
      { headers }
    );
    return artistTopTracks.data.artists;
  } catch (error: any) {
    console.log(error.response);
  }
};

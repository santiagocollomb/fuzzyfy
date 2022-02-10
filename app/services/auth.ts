import axios from "axios";
import { AUTH_CONSTS } from "~/helpers/consts";
import { generateRandomString } from "~/helpers/helpers";
import { AUTH_URLS } from "~/helpers/urls";

export const requestUserAuth = (): string => {
  var state = generateRandomString(16);
  var scope =
    "user-read-private user-read-email user-follow-read user-library-read user-read-playback-state user-read-currently-playing user-top-read user-read-recently-played playlist-read-private";

  return `https://accounts.spotify.com${AUTH_URLS.authorize(
    "c71461e148804cf4a6ce7faf6e421e69",
    AUTH_CONSTS.redirectUri,
    scope,
    state
  )}`;
};

export const requestAccessToken = async (authCode: string): Promise<any> => {
  const reqUrl = `https://accounts.spotify.com${AUTH_URLS.requestToken}`;

  const reqBody = new URLSearchParams({
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: AUTH_CONSTS.redirectUri,
    client_id: AUTH_CONSTS.clientId,
    client_secret: AUTH_CONSTS.clientSecret,
  });

  const reqHeaders = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const accessTokenResponse = await axios.post(reqUrl, reqBody, reqHeaders);

  return accessTokenResponse.data;
};
/*
export const refreshAccessToken = async (
  refreshToken: string
): Promise<any> => {
  const reqUrl = `https://accounts.spotify.com${AUTH_URLS.requestToken}`;

  const reqBody = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: AUTH_CONSTS.clientId,
    client_secret: AUTH_CONSTS.clientSecret,
  });

  const reqHeaders = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const accessTokenResponse = await axios.post(reqUrl, reqBody, reqHeaders);

  return accessTokenResponse.data;
}; */

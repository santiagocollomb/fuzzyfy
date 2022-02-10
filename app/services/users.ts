import axios from "axios";
import { API_CONSTS } from "~/helpers/consts";
import { Album } from "~/helpers/types";
import { USER_URLS } from "~/helpers/urls";

export const getProfile = async (
  accessToken: string
): Promise<Album | undefined> => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const profile = await axios(`${API_CONSTS.apiUrl}${USER_URLS.getProfile}`, {
      headers,
    });
    return profile.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTopItems = async (accessToken: string, type = "artists") => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const items = await axios(
      `${API_CONSTS.apiUrl}${USER_URLS.getItems(type, 5)}`,
      { headers }
    );
    return items.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

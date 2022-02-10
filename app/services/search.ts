import axios from "axios";
import { API_CONSTS } from "~/helpers/consts";
import { SEARCH_URLS } from "~/helpers/urls";


export const searchForItems = async (searchQuery: string, accessToken: string, type = '') => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const items = await axios(`${API_CONSTS.apiUrl}${SEARCH_URLS.searchForItem(searchQuery,type)}`, { headers });
    return items.data;
  } catch (error:any) {
    console.log(error.response)
  }
};

import axios from "axios";
import { baseURL } from "../utils/constants";

export const CoinService = {
  getCoinMarkets: (data) => {
    const { pageNo } = data;
    return axios.get(
      baseURL +
        `/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=${pageNo}`
    );
  },
  getCoinDataById: (data) => {
    const { coinId } = data;
    return axios.post(baseURL + `/api/v3/coins/${coinId}`);
  },
};

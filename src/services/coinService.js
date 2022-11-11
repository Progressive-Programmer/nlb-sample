import axios from 'axios';
import { baseURL } from '../utils/constants';

const CoinService = {
  getCoinMarkets: (data) => {
    const { pageNo, perPage } = data;
    return axios.get(
      `${baseURL}/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=${perPage}&page=${pageNo}`
    );
  },
  getCoinDataById: (data) => {
    const { coinId } = data;
    return axios.get(`${baseURL}/api/v3/coins/${coinId}`);
  }
};

export default CoinService;

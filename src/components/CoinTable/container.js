import { connect } from 'react-redux';
import { getCoinDataById, getCoinMarkets } from '../../redux/slices/coinSlice';
import CoinTable from './CoinTable';

const mapStateToProps = (state) => {
  const { coins } = state;
  return {
    isLoading: coins.loading,
    hasError: coins.error,
    currentResponseId: coins.currentResponseId,
    currentPage: coins.currentPage,
    markets: coins.markets,
    coinData: coins.coinData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoinMarketsBypage: (pageNo) => dispatch(getCoinMarkets(pageNo)),
    getCoinDateByCoinId: (coinId) => dispatch(getCoinDataById(coinId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinTable);

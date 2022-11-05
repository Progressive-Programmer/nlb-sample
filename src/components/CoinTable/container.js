import { connect } from "react-redux";
import { getCoinDataById, getCoinMarkets } from "../../redux/slices/coinSlice";
import CoinTable from "./component";

const mapStateToProps = (state, ownPros) => {
  let coins = state.coins
  return {
    isLoading: coins.loading,
    hasError: coins.error,
    currentResponseId: coins.currentResponseId,
    currentPage: coins.currentPage,
    markets: coins.markets,
    coinData: coins.coinData,
  };
};

const mapDispatchToProps = (dispatch, ownPros) => {
  return {
    getCoinMarketsBypage: (pageNo) => dispatch(getCoinMarkets(pageNo)),
    getCoinDateByCoinId: (coinId) => dispatch(getCoinDataById(coinId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinTable);

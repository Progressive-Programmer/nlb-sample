import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CoinService from '../../services/coinService';

const initialState = {
  loading: false,
  error: null,
  currentResponseId: undefined,
  currentPage: '',
  markets: [],
  coinData: undefined
};

// making async call for apis
export const getCoinMarkets = createAsyncThunk(
  'coins/markets',
  async (data, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().coins;
    if (loading !== true || requestId === currentRequestId) {
      // checking if loading is ongoing or there's a new request id
      return false;
    }
    const res = await CoinService.getCoinMarkets(data);
    return res.data;
  }
);

export const getCoinDataById = createAsyncThunk(
  'coins/coinDataById',
  async (data, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().coins;
    if (loading !== true || requestId === currentRequestId) {
      // checking if loading is ongoing or there's a new request id
      return false;
    }
    const res = await CoinService.getCoinDataById(data);
    return res.data;
  }
);

// creating slice and reducers
export const coinSlice = createSlice({
  name: 'coins',
  initialState,
  extraReducers: {
    // add cases for markets
    [getCoinMarkets.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true;
        state.currentResponseId = action.meta.requestId;
      }
    },
    [getCoinMarkets.fulfilled]: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.markets = action.payload;
        state.currentResponseId = undefined;
      }
    },
    [getCoinMarkets.rejected]: (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.error;
        state.currentResponseId = undefined;
      }
    },
    //   add cases for coin data by id
    [getCoinDataById.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true;
        state.currentResponseId = action.meta.requestId;
      }
    },
    [getCoinDataById.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentResponseId === requestId) {
        state.loading = false;
        state.coinData = action.payload;
        state.currentResponseId = undefined;
      }
    },
    [getCoinDataById.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === true && state.currentResponseId === requestId) {
        state.loading = false;
        state.error = action.error;
        state.currentResponseId = undefined;
      }
    }
  }
});

// Action creators are generated for each case reducer function
export default coinSlice.reducer;

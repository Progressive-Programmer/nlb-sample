import { configureStore } from "@reduxjs/toolkit";

import coinReducer from "./slices/coinSlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `coins`, handled by `coinsReducer`
    coins: coinReducer,
  },
});

export default store;

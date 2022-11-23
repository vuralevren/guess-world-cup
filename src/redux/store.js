import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { authSlice } from "./auth/authSlice";
import { leagueSlice } from "./league/leagueSlice";

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [leagueSlice.name]: leagueSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).prepend(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default makeStore;

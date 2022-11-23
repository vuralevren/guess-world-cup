import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import leagueSaga from "./league/leagueSaga";

function* rootSaga() {
  yield all([fork(authSaga), fork(leagueSaga)]);
}

export default rootSaga;

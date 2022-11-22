import authService from "./authService";
import {
  takeEvery,
  put,
  call,
  all,
  select,
  debounce,
  takeLatest,
} from "redux-saga/effects";
import { authActions } from "./authSlice";
import _ from "lodash";

function* registerSaga({ payload: { userReq, onSuccess, onFailure } }) {
  try {
    const { user, errors } = yield call(authService.register, userReq);
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(authActions.registerSuccess({ user }));
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.registerFailure(e));
  }
}

function* checkUserNameSaga({ payload: { userName, onSuccess, onFailure } }) {
  try {
    const { data, errors } = yield call(authService.checkUserName, userName);
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess(data.isAvailable);
    yield put(authActions.checkUserNameSuccess());
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.checkUserNameFailure(e));
  }
}

function* signInSaga({ payload: { email, password, onSuccess, onFailure } }) {
  try {
    const { user, errors } = yield call(authService.signIn, email, password);
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(authActions.signInSuccess({ user }));
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.registerFailure(e));
  }
}

function* forgotPasswordSaga({ payload: { email, onSuccess, onFailure } }) {
  try {
    const { errors } = yield call(authService.forgotPassword, email);
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(authActions.forgotPasswordSuccess());
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.forgotPasswordFailure(e));
  }
}

function* signInWithTokenSaga({
  payload: { accessToken, onSuccess, onFailure },
}) {
  try {
    const { user, errors } = yield call(
      authService.signInWithToken,
      accessToken
    );
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(authActions.signInWithTokenSuccess({ user }));
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.signInWithTokenFailure(e));
  }
}

function* signOutSaga({ payload: { onSuccess, onFailure } }) {
  try {
    const { errors } = yield call(authService.signOut);
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(authActions.signOutSuccess());
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.signOutFailure(e));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(authActions.registerRequest.type, registerSaga),
    takeLatest(authActions.checkUserNameRequest.type, checkUserNameSaga),
    takeLatest(authActions.signInRequest.type, signInSaga),
    takeLatest(authActions.forgotPasswordRequest.type, forgotPasswordSaga),
    takeLatest(authActions.signInWithTokenRequest.type, signInWithTokenSaga),
    takeLatest(authActions.signOutRequest.type, signOutSaga),
  ]);
}

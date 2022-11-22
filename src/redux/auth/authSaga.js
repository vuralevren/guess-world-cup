import authService from "./authService";
import {
  takeEvery,
  put,
  call,
  all,
  select,
  fork,
  takeLatest,
} from "redux-saga/effects";
import { authActions } from "./authSlice";
import _ from "lodash";
import fileService from "../file/fileService";
import { deleteFileSaga, uploadFileSaga } from "../file/fileSaga";

function* registerSaga({ payload: { userReq, onSuccess, onFailure } }) {
  try {
    const { errors } = yield call(authService.register, userReq);
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(authActions.registerSuccess());
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
    yield put(authActions.registerFailure(e));
  }
}

function* checkUserNameSaga({
  payload: { userName, userId, onSuccess, onFailure },
}) {
  try {
    const { data, errors } = yield call(
      authService.checkUserName,
      userName,
      userId
    );
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess(data.isAvailable);
    yield put(authActions.checkUserNameSuccess());
  } catch (e) {
    yield put(authActions.checkUserNameFailure(e));
    if (_.isFunction(onFailure)) onFailure(e);
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

    if (_.isFunction(onSuccess)) onSuccess(user);
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

function* getUserFromDBSaga() {
  const user = yield select((state) => state.auth.user);

  if (!_.isNil(user)) {
    try {
      const { user: fetchedUser, errors } = yield call(
        authService.getUserFromDB
      );
      if (errors) {
        throw errors;
      }

      authService.setUser(fetchedUser);
      yield put(authActions.signInSuccess({ user: fetchedUser }));
    } catch (e) {
      yield put(authActions.signInFailure(e));
    }
  }
}

function* updateUserFieldsSaga({
  payload: { userId, fields, onSuccess, onFailure },
}) {
  try {
    const { data: updatedUser, errors } = yield call(
      authService.updateUserFields,
      userId,
      fields
    );
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    authService.setUser(updatedUser);
    yield put(authActions.updateUserFieldsSuccess({ user: updatedUser }));
  } catch (e) {
    yield put(authActions.updateUserFieldsFailure(e));
    if (_.isFunction(onFailure)) onFailure(e);
  }
}

function* uploadProfilePictureSaga({
  payload: { userId, file, onSuccess, onFailure },
}) {
  try {
    const {
      data: { publicPath },
      errors: fileErrors,
    } = yield call(uploadFileSaga, { name: `user_${userId}`, file });
    if (fileErrors) {
      throw fileErrors;
    }

    const { data: updatedUser, errors } = yield call(
      authService.updateUserFields,
      userId,
      { profilePicture: publicPath }
    );
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    authService.setUser(updatedUser);
    yield put(authActions.updateUserFieldsSuccess({ user: updatedUser }));
  } catch (e) {
    yield put(authActions.updateUserFieldsFailure(e));
    if (_.isFunction(onFailure)) onFailure(e);
  }
}

function* deleteProfilePictureSaga({
  payload: { userId, onSuccess, onFailure },
}) {
  try {
    const { errors: fileErrors } = yield call(deleteFileSaga, {
      name: `user_${userId}`,
    });
    if (fileErrors) {
      throw fileErrors;
    }

    const { data: updatedUser, errors } = yield call(
      authService.updateUserFields,
      userId,
      { profilePicture: null }
    );
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    authService.setUser(updatedUser);
    yield put(authActions.updateUserFieldsSuccess({ user: updatedUser }));
  } catch (e) {
    yield put(authActions.updateUserFieldsFailure(e));
    if (_.isFunction(onFailure)) onFailure(e);
  }
}

export default function* rootSaga() {
  yield all([
    fork(getUserFromDBSaga),
    takeLatest(authActions.registerRequest.type, registerSaga),
    takeLatest(authActions.checkUserNameRequest.type, checkUserNameSaga),
    takeLatest(authActions.signInRequest.type, signInSaga),
    takeLatest(authActions.forgotPasswordRequest.type, forgotPasswordSaga),
    takeLatest(authActions.signInWithTokenRequest.type, signInWithTokenSaga),
    takeLatest(authActions.signOutRequest.type, signOutSaga),
    takeLatest(authActions.updateUserFieldsRequest.type, updateUserFieldsSaga),
    takeLatest(
      authActions.uploadProfilePictureRequest.type,
      uploadProfilePictureSaga
    ),
    takeLatest(
      authActions.deleteProfilePictureRequest.type,
      deleteProfilePictureSaga
    ),
  ]);
}

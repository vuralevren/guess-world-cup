import leagueService from "./leagueService";
import {
  takeEvery,
  put,
  call,
  all,
  select,
  fork,
  takeLatest,
} from "redux-saga/effects";
import { leagueActions } from "./leagueSlice";
import _ from "lodash";
import { setUserFieldsSaga } from "../auth/authSaga";
import { useSelector } from "react-redux";

function* createSaga({
  payload: {
    teamName,
    leagueName,
    leaguePassword,
    userName,
    onSuccess,
    onFailure,
  },
}) {
  try {
    const { data: league, errors } = yield call(leagueService.create, {
      teamName,
      leagueName,
      leaguePassword,
      userName,
    });
    if (errors) {
      throw errors;
    }

    const userId = yield select((state) => state.auth.user._id);
    const { errors: userError } = yield call(setUserFieldsSaga, {
      userId,
      fields: {
        field: "leagueSlugs",
        updateType: "push",
        value: league.slug,
      },
    });
    if (userError) {
      throw userError;
    }

    if (_.isFunction(onSuccess)) onSuccess(league.slug);
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
  }
}

function* checkLeagueNameSaga({
  payload: { leagueName, leagueId, onSuccess, onFailure },
}) {
  try {
    const { data, errors } = yield call(
      leagueService.checkLeagueName,
      leagueName,
      leagueId
    );
    if (errors) {
      throw errors;
    }

    if (_.isFunction(onSuccess)) onSuccess(data.isAvailable);
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
  }
}

function* getLeagueBySlugSaga({
  payload: { leagueSlug, onSuccess, onFailure },
}) {
  try {
    const currentUser = yield select((state) => state.auth.user);

    const { data: teams, errors: teamErrors } = yield call(
      leagueService.getTeamsByLeagueSlug,
      leagueSlug
    );
    if (teamErrors) {
      throw teamErrors;
    }
    const userTeam = _.find(teams, (team) => team.user._id === currentUser._id);
    if (!userTeam) {
      throw new Error("The league has not user's team");
    }

    const { data: league, errors: leagueErrors } = yield call(
      leagueService.getLeagueBySlug,
      leagueSlug
    );
    if (leagueErrors) {
      throw leagueErrors;
    }

    if (_.isFunction(onSuccess)) onSuccess();
    yield put(
      leagueActions.setLeague({
        ..._.first(league),
        teams,
      })
    );
  } catch (e) {
    if (_.isFunction(onFailure)) onFailure(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(leagueActions.createRequest.type, createSaga),
    takeLatest(leagueActions.checkLeagueNameRequest.type, checkLeagueNameSaga),
    takeLatest(leagueActions.getLeagueBySlugRequest.type, getLeagueBySlugSaga),
  ]);
}

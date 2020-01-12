import { all, call, put, takeEvery } from "redux-saga/effects";
import * as api from "./api";

import { GET_SUBMISSION, GET_SUBMISSION_SUCCESS } from "./actions";

function* getSubmission(action) {
  try {
    console.log("tags");
    const submission = yield call(
      api.fetchSubmission,
      action.id,
      action.submissionType
    );
    console.log(submission);
    yield put({ type: GET_SUBMISSION_SUCCESS, payload: submission });
  } catch (error) {
    console.log(error);
  }
}

function* watchGetSubmission() {
  yield takeEvery(GET_SUBMISSION, getSubmission);
}

export default function* currentSubmissionSagas() {
  yield all([watchGetSubmission()]);
}

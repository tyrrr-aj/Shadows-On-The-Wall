import { all, call, put, takeEvery } from "redux-saga/effects";
import * as api from "./api";
import {
  GET_SUBMISSIONS,
  GET_SUBMISSIONS_SUCCESS,
  SUBMISSION_UPVOTE_SUCCESS,
  SUBMISSION_UPVOTE,
  SUBMISSION_DOWNVOTE,
  SUBMISSION_DOWNVOTE_SUCCESS
} from "./actions";

function* getSubmissions() {
  try {
    console.log("sss");
    const submissions = yield call(api.fetchSubmissions);
    console.log(submissions);
    yield put({ type: GET_SUBMISSIONS_SUCCESS, payload: submissions });
  } catch (error) {
    console.log(error);
  }
}

function* upvoteSubmission(action) {
  try {
    console.log("upvoteSubmission");
    const response = yield call(api.upvoteSubmission, action.id);
    console.log(response);
    yield put({ type: SUBMISSION_UPVOTE_SUCCESS, payload: response });
    yield put({ type: GET_SUBMISSIONS });
  } catch (error) {
    console.log(error);
  }
}

function* downvoteSubmission(action) {
  try {
    console.log("downvoteSubmission");
    const response = yield call(api.downvoteSubmission, action.id);
    console.log(response);
    yield put({ type: SUBMISSION_DOWNVOTE_SUCCESS, payload: response });
    yield put({ type: GET_SUBMISSIONS });
  } catch (error) {
    console.log(error);
  }
}

function* watchUpvoteSubmission() {
  yield takeEvery(SUBMISSION_UPVOTE, upvoteSubmission);
}

function* watchDownvoteSubmission() {
  yield takeEvery(SUBMISSION_DOWNVOTE, downvoteSubmission);
}

function* watchGetSubmissions() {
  yield takeEvery(GET_SUBMISSIONS, getSubmissions);
}

export default function* submissionsSagas() {
  yield all([
    watchGetSubmissions(),
    watchUpvoteSubmission(),
    watchDownvoteSubmission()
  ]);
}

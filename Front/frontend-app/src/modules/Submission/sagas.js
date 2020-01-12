import { all, call, put, takeEvery } from "redux-saga/effects";
import * as api from "./api";

import {
  GET_SUBMISSION,
  GET_SUBMISSION_SUCCESS,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT,
  ADD_SOLUTION_SUCCESS,
  ADD_SOLUTION
} from "./actions";

function* getSubmission(action) {
  try {
    console.log("getSubmission");
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

function* addComment(action) {
  try {
    const result = yield call(
      api.postComment,
      action.id,
      action.submissionType,
      action.comment
    );
    yield put({ type: ADD_COMMENT_SUCCESS });
    yield put({
      type: GET_SUBMISSION,
      id: action.id,
      submissionType: action.submissionType
    });
  } catch (error) {
    console.log(error);
  }
}

function* addSolution(action) {
  try {
    yield call(
      api.postSolution,
      action.id,
      action.submissionType,
      action.submission
    );
    yield put({ type: ADD_SOLUTION_SUCCESS });
  } catch (error) {
    console.log(error);
  }
}

function* watchAddSolution() {
  yield takeEvery(ADD_SOLUTION, addSolution);
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT, addComment);
}

function* watchGetSubmission() {
  yield takeEvery(GET_SUBMISSION, getSubmission);
}

export default function* currentSubmissionSagas() {
  yield all([watchGetSubmission(), watchAddComment(), watchAddSolution()]);
}

import { all } from "redux-saga/effects";
import submissionsSagas from "./Submissions/sagas";
import tagsSagas from "./Tags/sagas";
import currentSubmissionSagas from "./Submission/sagas";
import graphSagas from "./Graph/sagas";

export default function* rootSaga() {
  yield all([
    submissionsSagas(),
    tagsSagas(),
    currentSubmissionSagas(),
    graphSagas()
  ]);
}

import { all } from "redux-saga/effects";
import submissionsSagas from "./Submissions/sagas";
import tagsSagas from "./Tags/sagas";
import currentSubmissionSagas from "./Submission/sagas";

export default function* rootSaga() {
  yield all([submissionsSagas(), tagsSagas(), currentSubmissionSagas()]);
}

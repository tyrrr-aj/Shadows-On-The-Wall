import { all, call, put, takeEvery } from "redux-saga/effects";
import * as api from "./api";

import { GET_TAGS_SUCCESS, GET_TAGS } from "./actions";

function* getTags() {
  try {
    console.log("tags");
    const tags = yield call(api.fetchTags);
    console.log(tags);
    yield put({ type: GET_TAGS_SUCCESS, payload: tags });
  } catch (error) {
    console.log(error);
  }
}

function* watchGetTags() {
  yield takeEvery(GET_TAGS, getTags);
}

export default function* tagsSagas() {
  yield all([watchGetTags()]);
}

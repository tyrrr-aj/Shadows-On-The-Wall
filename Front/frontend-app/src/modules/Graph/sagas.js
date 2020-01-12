import { all, call, put, takeEvery } from "redux-saga/effects";
import * as api from "./api";

import { GET_GRAPH_DATA, GET_GRAPH_DATA_SUCCESS } from "./actions";

function* getGraphData(action) {
  try {
    console.log("getting graph data");
    const graphData = yield call(
      api.fetchGraphData,
      action.id,
      action.submissionType
    );
    console.log(graphData);
    yield put({ type: GET_GRAPH_DATA_SUCCESS, payload: graphData });
  } catch (error) {
    console.log(error);
  }
}

function* watchGetGraphData() {
  yield takeEvery(GET_GRAPH_DATA, getGraphData);
}

export default function* graphSagas() {
  yield all([watchGetGraphData()]);
}

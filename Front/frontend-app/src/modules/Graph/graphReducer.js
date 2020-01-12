import { GET_GRAPH_DATA, GET_GRAPH_DATA_SUCCESS } from "./actions";

const initialState = {
  graphData: {},
  loading: false
};

export default function graphReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GRAPH_DATA:
      return { ...state, loading: true };
    case GET_GRAPH_DATA_SUCCESS:
      return { ...state, graphData: action.payload, loading: false };
    default:
      return state;
  }
}

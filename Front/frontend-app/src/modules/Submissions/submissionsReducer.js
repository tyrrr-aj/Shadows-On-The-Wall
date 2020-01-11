import { GET_SUBMISSIONS, GET_SUBMISSIONS_SUCCESS } from "./actions";

const initialState = {
  submissions: [],
  loading: false
};

export default function submissionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return { ...state, loading: true };
    case GET_SUBMISSIONS_SUCCESS:
      return { ...state, submissions: action.payload, loading: false };
    default:
      return state;
  }
}

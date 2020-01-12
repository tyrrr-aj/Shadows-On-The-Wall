import { GET_SUBMISSION, GET_SUBMISSION_SUCCESS } from "./actions";

const initialState = {
  submission: {
    title: "",
    description: "",
    rating: null,
    author: "",
    tags: [],
    comments: [],
    solutions: []
  },
  loading: false
};

export default function currentSubmissionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSION:
      return { ...state, loading: true };
    case GET_SUBMISSION_SUCCESS:
      return { ...state, submission: action.payload, loading: false };
    default:
      return state;
  }
}

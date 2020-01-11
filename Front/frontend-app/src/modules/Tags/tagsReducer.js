import { GET_TAGS, GET_TAGS_SUCCESS } from "./actions";

const initialState = {
  tags: [],
  loading: false
};

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, loading: true };
    case GET_TAGS_SUCCESS:
      return { ...state, tags: action.payload, loading: false };
    default:
      return state;
  }
}

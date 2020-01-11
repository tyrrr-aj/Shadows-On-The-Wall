import { GET_TAGS, GET_TAGS_SUCCESS, SET_SELECTED_TAGS } from "./actions";

const initialState = {
  tags: [],
  selectedTags: [],
  sorting: null,
  loading: false
};

export default function filteringReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, loading: true };
    case GET_TAGS_SUCCESS:
      return { ...state, tags: action.payload, loading: false };
    case SET_SELECTED_TAGS:
      return { ...state, selectedTags: action.tags, loading: false };
    default:
      return state;
  }
}

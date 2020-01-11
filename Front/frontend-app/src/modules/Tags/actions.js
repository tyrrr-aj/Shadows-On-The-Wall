export const GET_TAGS = "GET_TAGS";
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";
export const SET_SELECTED_TAGS = "SET_SELECTED_TAGS";

export const getTags = () => ({
  type: GET_TAGS
});

export const setSelectedTags = tags => ({
  type: SET_SELECTED_TAGS,
  tags
});

export const GET_SUBMISSION = "GET_SUBMISSION";
export const GET_SUBMISSION_SUCCESS = "GET_SUBMISSION_SUCCESS";
export const ADD_SOLUTION = "ADD_SOLUTION";
export const ADD_SOLUTION_SUCCESS = "ADD_SOLUTION_SUCCES";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_SUBINITIATIVE = "ADD_SUBINITIATIVE";
export const ADD_SUBINITIATIVE_SUCCESS = "ADD_SUBINITIATIVE_SUCCESS";

export const getSubmission = (id, submissionType) => ({
  type: GET_SUBMISSION,
  id,
  submissionType
});

export const addComment = (id, submissionType, author, text) => ({
  type: ADD_COMMENT,
  id,
  submissionType,
  author,
  text
});

export const addSubinitiative = (id, submission) => ({
  type: ADD_SUBINITIATIVE,
  id,
  submission
});

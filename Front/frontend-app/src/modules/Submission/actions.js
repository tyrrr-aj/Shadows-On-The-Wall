export const GET_SUBMISSION = "GET_SUBMISSION";
export const GET_SUBMISSION_SUCCESS = "GET_SUBMISSION_SUCCESS";
export const CLEAR_SUBMISSION = "CLEAR_SUBMISSION";
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

export const clearSubmission = () => ({
  type: CLEAR_SUBMISSION
});

export const addComment = (
  id,
  submissionType,
  comment,
  parentSubmissionType
) => ({
  type: ADD_COMMENT,
  id,
  submissionType,
  comment,
  parentSubmissionType
});

export const addSolution = (id, submissionType, submission) => ({
  type: ADD_SOLUTION,
  id,
  submissionType,
  submission
});

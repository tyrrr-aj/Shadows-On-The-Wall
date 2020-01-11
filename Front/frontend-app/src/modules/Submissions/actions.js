export const GET_SUBMISSIONS = "GET_SUBMISSIONS";
export const GET_SUBMISSIONS_SUCCESS = "GET_SUBMISSIONS_SUCCESS";
export const SUBMISSION_UPVOTE = "SUBMISSION_UPVOTE";
export const SUBMISSION_UPVOTE_SUCCESS = "SUBMISSION_UPVOTE_SUCCESS";
export const SUBMISSION_DOWNVOTE = "SUBMISSION_DOWNVOTE";
export const SUBMISSION_DOWNVOTE_SUCCESS = "SUBMISSION_DOWNVOTE_SUCCESS";
export const POST_SUBMISSION = "POST_SUBMISSION";
export const POST_SUBMISSION_SUCCESS = "POST_SUBMISSION_SUCCESS";

export const getSubmissions = () => ({
  type: GET_SUBMISSIONS
});

export const upvoteSubmission = id => ({
  type: SUBMISSION_UPVOTE,
  id
});

export const downvoteSubmission = id => ({
  type: SUBMISSION_DOWNVOTE,
  id
});

export const postSubmission = (submission, submissionType) => ({
  type: POST_SUBMISSION,
  submission,
  submissionType
});

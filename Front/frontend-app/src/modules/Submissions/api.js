import { serverURL } from "../../constants";
import { submissionTypes } from "../../Utils/submissionTypes";

export function fetchSubmissions() {
  const url = `${serverURL}submissions`;
  return fetch(url).then(response => response.json());
}

export function upvoteSubmission(id, submissionType) {
  const url = `${serverURL}${submissionType}/${id}/upvote`;
  return fetch(url);
}

export function downvoteSubmission(id, submissionType) {
  const url = `${serverURL}${submissionType}/${id}/downvote`;
  return fetch(url);
}

export function postSubmission(submission, submissionType) {
  const url = `${serverURL}${submissionType}/new`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(submission)
  });
  console.log(submission);
}

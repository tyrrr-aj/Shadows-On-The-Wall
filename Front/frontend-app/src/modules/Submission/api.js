import { serverURL } from "../../constants";

export function fetchSubmission(id, submissionType) {
  const url = `${serverURL}${submissionType}/${id}`;
  return fetch(url).then(response => response.json());
}

export function postComment(id, submissionType, comment) {
  const url = `${serverURL}${submissionType}/${id}/add_comment`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });
}

export function postSolution(id, submissionType, solution) {
  const url = `${serverURL}${submissionType}/${id}/add_solution`;
  console.log(id, submissionType, solution);
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(solution)
  });
}

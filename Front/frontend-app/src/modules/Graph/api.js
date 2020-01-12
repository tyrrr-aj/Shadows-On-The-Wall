import { serverURL } from "../../constants";

export function fetchGraphData(id, submissionType) {
  const url = `${serverURL}${submissionType}/${id}/graph`;
  return fetch(url).then(response => response.json());
  return {
    root: {
      pk: 1,
      type: "problem",
      votes: 0,
      date: "Sat Jan 11 19:50:36 2020"
    },
    nodes: [
      {
        pk: 10,
        type: "solution",
        votes: 2,
        date: "Sat Jan 11 19:21:47 2020"
      },
      {
        pk: 11,
        type: "solution",
        votes: 0,
        date: "Sat Jan 11 19:23:12 2020"
      }
    ],
    edges: [
      {
        source_type: "problem",
        source: 1,
        end_type: "solution",
        end: 10
      },
      {
        source_type: "problem",
        source: 1,
        end_type: "solution",
        end: 11
      }
    ]
  };
}

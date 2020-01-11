import { serverURL } from "../../constants";

export function fetchSubmissions() {
  return [
    {
      type: 0,
      title: "a problem",
      description: "asfdjhbgf",
      rating: 10,
      tags: ["tag1", "tag2", "tag3"]
    },
    {
      type: 1,
      title: "initiative to....",
      description: "asdjhas",
      rating: 0,
      tags: ["tag1", "tag5"]
    },
    {
      type: 0,
      title: "name",
      description: "jahskd",
      rating: 4,
      tags: []
    }
  ];
  console.log("x");
  const url = `${serverURL}submissions`;
  return fetch(url).then(response => response.json());
}

export function upvoteSubmission(id) {
  return id;
}

export function downvoteSubmission(id) {
  return id;
}

import { serverURL } from "../../constants";

export function fetchTags() {
  const url = `${serverURL}tags`;
  return fetch(url).then(response => response.json());
  return ["tag1", "tag2", "tag3"];
}

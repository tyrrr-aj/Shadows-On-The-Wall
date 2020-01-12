export const GET_GRAPH_DATA = "GET_GRAPH_DATA ";
export const GET_GRAPH_DATA_SUCCESS = "GET_GRAPH_DATA_SUCCES";

export const getGraphData = (id, submissionType) => ({
  type: GET_GRAPH_DATA,
  id,
  submissionType
});

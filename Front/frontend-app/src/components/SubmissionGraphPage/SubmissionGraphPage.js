import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import ProblemPage from "../ProblemPage/ProblemPage";
import ProblemGraph from "../ProblemGraph/ProblemGraph";
import InitiativeGraph from "../InitiativeGraph/InitiativeGraph";
import { connect } from "react-redux";
import { submissionTypes } from "../../Utils/submissionTypes";
import { getGraphData } from "../../modules/Graph/actions";
import {
  clearSubmission,
  getSubmission
} from "../../modules/Submission/actions";
import _isEmpty from "lodash/isEmpty";
import GraphSidePanel from "../GraphSidePanel/GraphSidePanel";

const SubmissionGraphPage = ({
  match,
  isProblem,
  getGraphData,
  graphData,
  clearSubmission,
  getSubmission
}) => {
  useEffect(() => {
    const id = match.params.id;
    clearSubmission();
    getGraphData(
      id,
      isProblem ? submissionTypes.problem : submissionTypes.initiative
    );
  }, []);
  console.log(_isEmpty(graphData));
  return _isEmpty(graphData) ? null : (
    <Grid container>
      <Grid xs={4}>
        <GraphSidePanel />
      </Grid>
      <Grid xs={8}>
        {isProblem ? (
          <ProblemGraph getSubmission={getSubmission} graphData={graphData} />
        ) : (
          <InitiativeGraph
            getSubmission={getSubmission}
            graphData={graphData}
          />
        )}
      </Grid>
    </Grid>
  );
};

SubmissionGraphPage.propTypes = {};

const mapStateToProps = state => ({
  graphData: state.graph.graphData,
  loading: state.graph.loading
});

const mapDispatchToProps = dispatch => ({
  clearSubmission: () => {
    dispatch(clearSubmission());
  },
  getGraphData: (id, submissionType) => {
    dispatch(getGraphData(id, submissionType));
  },
  getSubmission: (pk, type) => {
    dispatch(getSubmission(pk, type));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionGraphPage);

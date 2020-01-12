import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import ProblemMainPanel from "./ProblemMainPanel";
import { connect } from "react-redux";
import { getSubmission } from "../../modules/Submission/actions";
import { submissionTypes } from "../../Utils/submissionTypes";
import ProblemLeftPanel from "./ProblemLeftPanel";
import { withRouter } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";

const ProblemPage = ({
  match,
  history,
  getProblem,
  problem,
  hideLeftPanel
}) => {
  useEffect(() => {
    refreshProblem();
  }, []);

  const refreshProblem = () => {
    const id = match.params.id;
    getProblem(id);
  };
  return _isEmpty(problem) ? null : (
    <div>
      <Grid container justify="center" item xs={12}>
        {hideLeftPanel ? null : <ProblemLeftPanel pk={problem.pk} />}
        <ProblemMainPanel problem={problem} />
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  problem: state.currentSubmission.submission,
  loading: state.currentSubmission.loading
});

const mapDispatchToProps = dispatch => ({
  getProblem: pk => {
    dispatch(getSubmission(pk, submissionTypes.problem));
  }
});

ProblemPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProblemPage));

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import ProblemMainPanel from "./ProblemMainPanel";
import { connect } from "react-redux";
import { getSubmission } from "../../modules/Submission/actions";
import { submissionTypes } from "../../Utils/submissionTypes";
import ProblemLeftPanel from "./ProblemLeftPanel";

const ProblemPage = ({ match, history, getProblem, problem }) => {
  useEffect(() => {
    const id = match.params.id;
    getProblem(id);
  }, []);

  return (
    <div>
      <Grid container justify="center" item xs={12}>
        <ProblemLeftPanel id={problem.id} />
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
  getProblem: id => {
    dispatch(getSubmission(id, submissionTypes.problem));
  }
});

ProblemPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage);

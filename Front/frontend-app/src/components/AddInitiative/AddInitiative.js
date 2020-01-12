import React from "react";
import PropTypes from "prop-types";
import SubmissionForm from "../SubmissionForm/SubmissionForm";
import { connect } from "react-redux";
import { submissionTypes } from "../../Utils/submissionTypes";
import { postSubmission } from "../../modules/Submissions/actions";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const AddInitiative = ({ match, location, postProblem, history }) => {
  const handlePostProblem = problem => {
    const params = queryString.parse(location.search);
    if (params.improvementof) {
      problem.improvementof = params.improvementof;
    }
    postProblem(problem);
    history.push("/");
  };
  return (
    <div>
      Submit an initiative
      <SubmissionForm postSubmission={handlePostProblem} />
    </div>
  );
};

AddInitiative.propTypes = {};

const mapDispatchToProps = dispatch => ({
  postProblem: problem => {
    dispatch(postSubmission(problem, submissionTypes.initiative));
  }
});
export default connect(null, mapDispatchToProps)(withRouter(AddInitiative));

import React from "react";
import PropTypes from "prop-types";
import SubmissionForm from "../SubmissionForm/SubmissionForm";
import { connect } from "react-redux";
import { submissionTypes } from "../../Utils/submissionTypes";
import { postSubmission } from "../../modules/Submissions/api";
import { withRouter } from "react-router-dom";

const AddInitiative = ({ postProblem, history }) => {
  const handlePostProblem = problem => {
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

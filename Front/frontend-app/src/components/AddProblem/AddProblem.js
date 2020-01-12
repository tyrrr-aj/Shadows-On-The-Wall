import React from "react";
import PropTypes from "prop-types";
import SubmissionForm from "../SubmissionForm/SubmissionForm";
import { connect } from "react-redux";
import { submissionTypes } from "../../Utils/submissionTypes";
import { postSubmission } from "../../modules/Submissions/actions";
import { withRouter } from "react-router-dom";

const AddProblem = ({ postProblem, history }) => {
  const handlePostProblem = problem => {
    postProblem(problem);
    history.push("/");
  };
  return (
    <div>
      Submit a problem
      <SubmissionForm postSubmission={handlePostProblem} />
    </div>
  );
};

AddProblem.propTypes = {};

const mapDispatchToProps = dispatch => ({
  postProblem: problem => {
    dispatch(postSubmission(problem, submissionTypes.problem));
  }
});
export default connect(null, mapDispatchToProps)(withRouter(AddProblem));

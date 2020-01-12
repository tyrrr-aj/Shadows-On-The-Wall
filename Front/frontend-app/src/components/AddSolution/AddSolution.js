import React from "react";
import PropTypes from "prop-types";
import SubmissionForm from "../SubmissionForm/SubmissionForm";
import { submissionTypes } from "../../Utils/submissionTypes";
import { connect } from "react-redux";
import { addSolution } from "../../modules/Submission/actions";

const AddSolution = ({ location, match, postSolution, history }) => {
  const handlePostSolution = solution => {
    const id = match.params.id;
    console.log(location);
    const type = location.pathname.contains("problem")
      ? submissionTypes.problem
      : submissionTypes.solution;
    postSolution(id, type, solution);
    history.go(-1);
  };
  return (
    <div>
      Submit solution
      <SubmissionForm noTags={true} postSubmission={handlePostSolution} />
    </div>
  );
};

AddSolution.propTypes = {};

const mapDispatchToProps = dispatch => ({
  postSolution: (id, type, solution) => {
    dispatch(addSolution(id, type, solution));
  }
});
export default connect(null, mapDispatchToProps)(AddSolution);

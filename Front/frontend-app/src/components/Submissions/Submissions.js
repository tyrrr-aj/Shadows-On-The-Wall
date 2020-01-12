import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SubmissionList from "./SubmissionList/SubmissionList";

const Submissions = props => {
  return (
    <Fragment>
      <SubmissionList />
    </Fragment>
  );
};

Submissions.propTypes = {};

export default Submissions;

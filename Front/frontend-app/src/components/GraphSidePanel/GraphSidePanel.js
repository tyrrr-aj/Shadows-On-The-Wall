import React, { useEffect } from "react";
import PropTypes from "prop-types";
import EntryHeader from "../EntryHeader/EntryHeader";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getSubmission } from "../../modules/Submission/actions";
import isEmpty from "lodash/isEmpty";

const GraphSidePanel = ({ submission }) => {
  return isEmpty(submission) ? null : (
    <Grid container xs={12}>
      <EntryHeader {...submission} />
    </Grid>
  );
};

GraphSidePanel.propTypes = {};

const mapStateToProps = state => ({
  submission: state.currentSubmission.submission,
  loading: state.currentSubmission.loading
});

export default connect(mapStateToProps, null)(GraphSidePanel);

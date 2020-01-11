import React, { useEffect, memo } from "react";
import SubmissionListItem from "./SubmissionListItem";
import { Grid, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getSubmissions } from "../../../modules/Submissions/actions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%"
  }
}));

const SubmissionList = ({ submissions, getSubmissions }) => {
  useEffect(() => {
    getSubmissions();
  }, []);

  const classes = useStyles();

  return (
    <Grid container item xs={6}>
      <List classes={classes}>
        {submissions.map(submission => {
          return <SubmissionListItem submission={submission} />;
        })}
      </List>
    </Grid>
  );
};

const mapStateToProps = state => ({
  submissions: state.submissions.submissions,
  loading: state.submissions.loading
});

const mapDispatchToProps = dispatch => ({
  getSubmissions: () => {
    dispatch(getSubmissions());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SubmissionList));

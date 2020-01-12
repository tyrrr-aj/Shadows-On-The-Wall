import React, { Fragment, memo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from "@material-ui/core";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import {
  upvoteSubmission,
  downvoteSubmission
} from "../../../modules/Submissions/actions";
import "./Submission.scss";
import { withRouter } from "react-router-dom";
import { submissionTypes } from "../../../Utils/submissionTypes";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  listActionButtons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "inherit"
  }
}));

const SubmissionListItem = ({
  history,
  submission,
  handleUpVote,
  handleDownVote
}) => {
  const handleGoToSubmission = () => {
    history.push(`/${submission.type}/${submission.pk}`);
  };

  const handleUpVoteClick = () => {
    handleUpVote(submission.pk, submission.type);
  };

  const handleDownVoteClick = () => {
    handleDownVote(submission.pk, submission.type);
  };

  const handleAddImprovementClick = () => {
    history.push(
      `/${submissionTypes.initiative}/new?improvementof=${submission.pk}`
    );
  };

  const classes = useStyles();

  return (
    <Fragment>
      <ListItem button onClick={handleGoToSubmission}>
        <div className={"submission-list-item-details"}>
          <ListItemText primary={submission.title} />
          <div className={"submission-list-item-details__footer"}>
            <ListItemText secondary={`author: ${submission.author} `} />
            <ListItemText secondary={`type: ${submission.type} `} />
            <ListItemText
              secondary={`submission date: ${moment(
                submission.date_time
              ).format("LLL")}`}
            />
          </div>
        </div>
        <ListItemSecondaryAction className={classes.listActionButtons}>
          {submission.type === submissionTypes.initiative ? (
            <Button onClick={handleAddImprovementClick} variant="contained">
              add improvement
            </Button>
          ) : null}
          <div className={"submission__rating"}>
            <IconButton aria-label="upvote" onClick={handleUpVoteClick}>
              <ArrowDropUp />
            </IconButton>
            <p className={"submission__rating__value"}>{submission.votes}</p>
            <IconButton aria-label="downvote" onClick={handleDownVoteClick}>
              <ArrowDropDown />
            </IconButton>
          </div>
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

SubmissionListItem.propTypes = {};

const mapDispatchToProps = dispatch => ({
  handleUpVote: (id, type) => {
    dispatch(upvoteSubmission(id, type));
  },
  handleDownVote: (id, type) => {
    dispatch(downvoteSubmission(id, type));
  }
});
export default withRouter(
  connect(null, mapDispatchToProps)(memo(SubmissionListItem))
);

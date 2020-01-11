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
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import {
  upvoteSubmission,
  downvoteSubmission
} from "../../../modules/Submissions/actions";

const SubmissionListItem = ({ submission, handleUpVote, handleDownVote }) => {
  const handleGoToSubmission = () => {
    // reroute
  };

  const handleUpVoteClick = () => {
    handleUpVote(submission.id);
  };

  const handleDownVoteClick = () => {
    handleDownVote(submission.id);
  };

  return (
    <Fragment>
      <ListItem onClick={handleGoToSubmission}>
        <ListItemText
          primary={submission.title}
          secondary={submission.description}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="upvote" onClick={handleUpVoteClick}>
            <ThumbUp />
          </IconButton>
          {submission.rating}
          <IconButton aria-label="downvote" onClick={handleDownVoteClick}>
            <ThumbDown />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

SubmissionListItem.propTypes = {};

const mapDispatchToProps = dispatch => ({
  handleUpVote: id => {
    dispatch(upvoteSubmission(id));
  },
  handleDownVote: id => {
    dispatch(downvoteSubmission(id));
  }
});
export default connect(null, mapDispatchToProps)(memo(SubmissionListItem));

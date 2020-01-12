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
      <ListItem button onClick={handleGoToSubmission}>
        <ListItemText
          primary={submission.title}
          secondary={submission.description}
        />
        <ListItemSecondaryAction>
          <div className={"submission__rating"}>
            <IconButton aria-label="upvote" onClick={handleUpVoteClick}>
              <ArrowDropUp />
            </IconButton>
            <p className={"submission__rating__value"}>{submission.rating}</p>
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
  handleUpVote: id => {
    dispatch(upvoteSubmission(id));
  },
  handleDownVote: id => {
    dispatch(downvoteSubmission(id));
  }
});
export default connect(null, mapDispatchToProps)(memo(SubmissionListItem));

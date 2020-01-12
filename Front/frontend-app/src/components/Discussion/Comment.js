import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";

import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const Comment = ({
  pk,
  submissionType,
  comment,
  handleUpVote,
  handleDownVote
}) => {
  const handleUpVoteClick = () => {
    handleUpVote(pk, submissionType);
  };

  const handleDownVoteClick = () => {
    handleDownVote(pk, submissionType);
  };

  return (
    <ListItem>
      <ListItemText
        primary={comment.text}
        secondary={`author: ${comment.author}`}
      />
      <ListItemSecondaryAction>
        <div className={"submission__rating"}>
          <IconButton aria-label="upvote">
            <ArrowDropUp />
          </IconButton>
          <p className={"submission__rating__value"}>{0}</p>
          <IconButton aria-label="downvote">
            <ArrowDropDown />
          </IconButton>
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

Comment.propTypes = {};

export default Comment;

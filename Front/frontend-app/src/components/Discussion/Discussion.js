import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, Button } from "@material-ui/core";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const Discussion = ({ id, submissionType, comments }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <List className={classes.root}>
        {comments.map(comment => {
          return (
            <Comment
              id={id}
              submissionType={submissionType}
              comment={comment}
            />
          );
        })}
      </List>
      <Button variant="contained">add comment</Button>
    </Fragment>
  );
};

Discussion.propTypes = {};

export default Discussion;

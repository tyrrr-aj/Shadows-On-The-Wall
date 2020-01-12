import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { List, Button, TextField } from "@material-ui/core";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { addComment } from "../../modules/Submission/actions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const Discussion = ({ pk, submissionType, comments, addComment }) => {
  const classes = useStyles();

  const [isAddingComment, setIsAddingComment] = useState(false);
  const [text, setText] = useState("");

  const handleAddCommentClick = () => {
    if (isAddingComment) {
      const comment = {
        text: text,
        author: 1
      };
      addComment(pk, submissionType, comment);
      setIsAddingComment(false);
      setText("");
    } else {
      setIsAddingComment(true);
    }
  };

  const handleTextChange = event => {
    event.stopPropagation();
    setText(event.target.value);
  };

  return (
    <Fragment>
      <List className={classes.root}>
        {comments.map(comment => {
          return (
            <Comment
              pk={pk}
              submissionType={submissionType}
              comment={comment}
            />
          );
        })}
      </List>
      {isAddingComment ? (
        <TextField
          variant="outlined"
          name={"text"}
          label={"Comment"}
          value={text}
          onChange={handleTextChange}
        />
      ) : null}
      <Button onClick={handleAddCommentClick} variant="contained">
        {isAddingComment ? `post comment` : `add comment`}
      </Button>
    </Fragment>
  );
};

Discussion.propTypes = {};

const mapDispatchToProps = dispatch => ({
  addComment: (pk, type, comment) => {
    dispatch(addComment(pk, type, comment));
  }
});

export default connect(null, mapDispatchToProps)(Discussion);

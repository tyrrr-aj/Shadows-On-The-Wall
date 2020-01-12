import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: "1.5rem",
      display: "flex",
      flexDirection: "column"
    },
    width: "100%"
  }
}));

const EntryHeader = ({ title, description, author, votes, tags }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={9} className={classes.root}>
        <TextField
          variant="outlined"
          name={"title"}
          label={"Title"}
          value={title}
          disabled
        />
        <TextField
          label="Description"
          name="description"
          multiline
          value={description}
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <TextField name={"author"} label={"author"} value={author} disabled />
        <TextField
          name={"votes"}
          label={"votes"}
          value={votes || "0"}
          disabled
        />
        {tags ? (
          <TextField name={"tags"} label={"Tags"} value={tags || ""} disabled />
        ) : null}
      </Grid>
    </Grid>
  );
};

EntryHeader.propTypes = {};

export default EntryHeader;

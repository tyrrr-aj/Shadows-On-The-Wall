import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, Grid, TextField } from "@material-ui/core";
import Discussion from "../Discussion/Discussion";
import EntryHeader from "../EntryHeader/EntryHeader";
import "./Solution.scss";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%"
  }
}));

const Solution = ({ solution }) => {
  const classes = useStyles();
  return (
    <div className={"solution"}>
      <EntryHeader
        title={solution.title}
        description={solution.description}
        tags={solution.tags}
        author={solution.author}
        rating={solution.rating}
      />
      <Discussion comments={solution.comments} />
    </div>
  );
};

Solution.propTypes = {};

export default Solution;

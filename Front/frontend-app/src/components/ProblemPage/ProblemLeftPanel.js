import React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ProblemLeftPanel = ({ pk }) => {
  return (
    <Grid container direction="column" item xs={3}>
      <Link to={`/problem/${pk}/graph`}>
        <Button variant="contained">graph view</Button>
      </Link>
      <Link to={`/problem/${pk}/addSolution`}>
        <Button variant="contained">Add solution</Button>
      </Link>
    </Grid>
  );
};

ProblemLeftPanel.propTypes = {};

export default ProblemLeftPanel;

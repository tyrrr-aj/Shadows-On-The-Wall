import React from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ProblemLeftPanel = ({ id }) => {
  return (
    <Grid container item xs={3}>
      <Link to={`/problem/${id}/graph`}>
        <Button variant="contained">graph view</Button>
      </Link>
    </Grid>
  );
};

ProblemLeftPanel.propTypes = {};

export default ProblemLeftPanel;

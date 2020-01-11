import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import Submissions from "../Submissions/Submissions";
import TagPanel from "../TagPanel/TagPanel";
import { Grid } from "@material-ui/core";

const Home = props => {
  return (
    <div>
      <Header />
      Home
      <Grid container item xs={12}>
        <TagPanel />
        <Submissions />
      </Grid>
    </div>
  );
};

Home.propTypes = {};

export default Home;

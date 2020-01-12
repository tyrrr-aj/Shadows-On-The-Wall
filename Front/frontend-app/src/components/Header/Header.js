import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SortingPanel from "./SortingPanel/SortingPanel";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <Fragment>
      <Container component={"main"} maxWidth={"lg"}>
        <Grid justify={"space-around"} container spacing={0}>
          <Link to={"/problem/new"}>
            <Button variant="contained">New Problem</Button>
          </Link>
          <Link to={"/initiative/new"}>
            <Button variant="contained">New Initiative</Button>
          </Link>
          <SortingPanel />
        </Grid>
      </Container>
    </Fragment>
  );
};

Header.propTypes = {};

export default Header;

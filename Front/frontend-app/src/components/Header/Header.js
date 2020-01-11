import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import SortingPanel from "./SortingPanel/SortingPanel";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";

const Header = props => {
    return (
        <Fragment>
            <Container component={"main"} maxWidth={"lg"}>
                <Grid container spacing={0}>
                    <Button
                        variant="contained"
                        className={"improvisation"}>
                        New Problem
                    </Button>
                    <Button
                        variant="contained"
                        className={"improvisation"}>
                        New Initiative
                    </Button>
                    <SortingPanel/>
                </Grid>
            </Container>
        </Fragment>
    );
};

Header.propTypes = {};

export default Header;
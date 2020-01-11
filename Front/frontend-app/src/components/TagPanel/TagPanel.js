import React, { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getTags } from "../../modules/Tags/actions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%"
  }
}));

const TagPanel = ({ tags, getTags }) => {
  const classes = useStyles();

  useEffect(() => {
    getTags();
  }, []);

  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container item xs={3}>
      <List classes={classes.root}>
        {tags.map(tag => {
          const labelId = `checkbox-list-label-${tag}`;
          return (
            <ListItem
              key={tag}
              role={undefined}
              dense
              button
              onClick={handleToggle(tag)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(tag) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={tag} />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

TagPanel.propTypes = {};

const mapStateToProps = state => ({
  tags: state.tags.tags,
  loading: state.tags.loading
});

const mapDispatchToProps = dispatch => ({
  getTags: () => {
    dispatch(getTags());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(TagPanel));

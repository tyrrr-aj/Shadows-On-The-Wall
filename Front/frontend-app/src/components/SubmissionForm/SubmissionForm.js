import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
  FormHelperText,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column"
    }
  },
  button: {
    width: "10rem",
    alignSelf: "center"
  }
}));

const SubmissionForm = ({ postSubmission }) => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [values, setValues] = React.useState({
    id: "",
    title: "",
    description: "",
    tags: ""
  });
  const labelRef = React.useRef(null);
  const classes = useStyles();

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlePost = () => {
    postSubmission(values);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="outlined">
        <TextField
          placeholder={"insert title"}
          label={"Title"}
          variant="outlined"
          id="component-outlined"
          name={"title"}
          value={values.title}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl variant="outlined">
        <TextField
          id="component-outlined"
          label="Description"
          name="description"
          multiline
          rows={8}
          value={values.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl variant="outlined">
        <TextField
          placeholder={"insert tags"}
          variant="outlined"
          id="component-outlined"
          name={"tags"}
          label={"tags"}
          value={values.tags}
          onChange={handleChange}
          helperText={`Insert tags delimited with "," eg. "tag1,tag2"`}
        />
      </FormControl>
      <FormControl>
        <Button
          className={classes.button}
          onClick={handlePost}
          variant="contained"
        >
          Save
        </Button>
      </FormControl>
    </form>
  );
};

SubmissionForm.propTypes = {};

export default SubmissionForm;

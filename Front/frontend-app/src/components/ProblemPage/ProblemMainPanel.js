import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./ProblemMainPanel.scss";
import classNames from "classnames";
import Discussion from "../Discussion/Discussion";
import { submissionTypes } from "../../Utils/submissionTypes";
import Solution from "../Solution/Solution";
import EntryHeader from "../EntryHeader/EntryHeader";

const ProblemMainPanel = ({ problem }) => {
  console.log(problem);
  return (
    <Grid container justify="center" item xs={8}>
      <div className={classNames("problem-main-panel")}>
        <EntryHeader
          title={problem.title}
          description={problem.description}
          tags={problem.tags}
          author={problem.author}
          rating={problem.rating}
        />

        <Discussion
          submissionType={submissionTypes.problem}
          pk={problem.pk}
          comments={problem.comments}
        />
      </div>
      {problem.solutions
        ? problem.solutions.map(solution => <Solution solution={solution} />)
        : null}
    </Grid>
  );
};

ProblemMainPanel.propTypes = {};

export default ProblemMainPanel;

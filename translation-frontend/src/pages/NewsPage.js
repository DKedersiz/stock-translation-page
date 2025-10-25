import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NewsList from "../components/NewsList";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

const NewsPage = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <NewsList />
    </Grid>
  );
};

export default NewsPage;

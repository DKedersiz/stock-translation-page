import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "350px",
    overflowY: "auto",
  },
  content: {
    overflowY: "auto",
    maxHeight: 200,
    fontFamily: "'Roboto', sans-serif",
  },
  media: {
    height: 0,
    paddingTop: "5.25%", // 16:9
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 25,
    fontFamily: "'Roboto', sans-serif",
  },
  pos: {
    marginBottom: 12,
  },
});

const NewsCard = ({ news }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {news.title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.content}>
          {news.content}
          <br />
        </Typography>
        <Button
          className={classes.button}
          onClick={() => navigate("/" + news.id)}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;

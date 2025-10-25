import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import "@fontsource/roboto";

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
  media: {
    height: 0,
    paddingTop: "10.25%", // 16:9
  },
  content: {
    overflowY: "",
    maxHeight: 200,
    overflow: "hidden",
    fontFamily: "'Roboto',sans-serif",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 25,
    fontFamily: "'Roboto',sans-serif",
  },
  pos: {
    marginBottom: 12,
  },
});

const BlogCard = ({ blogs }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardMedia className={classes.media} image={blogs.image} />
        <br />
        <Typography variant="h5" component="h2" className={classes.title}>
          {blogs.title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.content}>
          {blogs.content}
          <br />
        </Typography>
        <Button onClick={() => navigate("/blog/" + blogs.id)}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

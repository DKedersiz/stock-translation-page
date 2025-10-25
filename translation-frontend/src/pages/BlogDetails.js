import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsService from "../services/blogsService";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import translateService from "../services/translateService";
import he from "he";

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
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function BlogDetails({ blogs }) {
  const classes = useStyles();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

  useEffect(() => {
    const fetchAndTranslate = async () => {
      try {
        const response = await blogsService.getBlogById(id);
        const fetchedBlog = response.data;
        setBlog(response.data);

        try {
          const translatedTitle = await translateService.translateText(
            fetchedBlog.title,
            "tr"
          );
          console.log(translatedTitle);
          const translatedText = await translateService.translateText(
            fetchedBlog.content,
            "tr"
          );
          console.log(he.decode(translatedContent));
          setTranslatedContent(translatedText);
          setTranslatedTitle(translatedTitle);
        } catch (translationError) {
          console.error("Translation error:", translationError);
        }
      } catch (fetchError) {
        console.error("Error fetching blog details:", fetchError);
      }
    };

    fetchAndTranslate();
  }, [id]);

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {he.decode(translatedTitle)}
          </Typography>
          <Typography variant="body2" component="p">
            {he.decode(translatedContent)}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default BlogDetails;

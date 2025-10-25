import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newsService from "../services/newsService";
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

function NewsDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

  useEffect(() => {
    const fetchAndTranslate = async () => {
      try {
        const response = await newsService.getNewsById(id);
        const fetchedNews = response.data;
        setNews(fetchedNews);

        const translatedTitle = await translateService.translateText(
          fetchedNews.title,
          "tr"
        );
        setTranslatedTitle(translatedTitle);

        if (fetchedNews.content) {
          const translatedContent = await translateService.translateText(
            fetchedNews.content,
            "tr"
          );
          setTranslatedContent(translatedContent);
        } else {
          setTranslatedContent(" ");
        }
      } catch (error) {
        console.error("Error fetching or translating news details:", error);
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
            <br />
          </Typography>
          {news && (
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              Habere buradan ulaşabilirsiniz
            </a>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default NewsDetails;

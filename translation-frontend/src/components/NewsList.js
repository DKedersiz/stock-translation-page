import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import newsService from "../services/newsService";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    newsService
      .getAllNews()
      .then((response) => {
        setNewsList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the news", error);
      });
  }, []);

  return (
    <div className="news-list">
      {newsList.map((news) => (
        <div key={news.id}>
          <NewsCard news={news} />
        </div>
      ))}
    </div>
  );
};

export default NewsList;

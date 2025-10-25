import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import blogsService from "../services/blogsService";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    blogsService
      .getAllBlogs()
      .then((response) => {
        setBlogList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the news", error);
      });
  }, []);

  return (
    <div className="blog-list">
      {blogList.map((blogs) => (
        <div key={blogs.id}>
          <BlogCard blogs={blogs} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;

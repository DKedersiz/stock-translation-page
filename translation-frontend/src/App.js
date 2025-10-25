import "./App.css";
import AppAndSideBar from "./components/AppAndSideBar";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
import BlogsPage from "./pages/BlogsPage";
import React from "react";
import BlogDetails from "./pages/BlogDetails";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <div className="App">
      <AppAndSideBar />
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/:id" element={<NewsDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

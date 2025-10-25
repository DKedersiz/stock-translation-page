import axios from "axios";

const API_URL = "http://localhost:8080/api/blogs";

const blogsService = {
  getBlogById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {});
    return response;
  },
  getAllBlogs: async () => {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

export default blogsService;

import axios from "axios";

const API_URL = "http://localhost:8080/api/news";

const newsService = {
  getNewsById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {});
    return response;
  },
  getAllNews: async () => {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};

export default newsService;

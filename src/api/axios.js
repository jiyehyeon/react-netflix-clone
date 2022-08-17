import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "3e99b7d0769fe61a752c48436558e183",
    language: "ko-KR",
  },
});

export default instance;

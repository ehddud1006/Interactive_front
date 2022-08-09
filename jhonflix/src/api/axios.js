import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e8a960ccca46e3b7c8974d7353cbfadc",
    language: "ko-KR",
  },
});

export default instance;

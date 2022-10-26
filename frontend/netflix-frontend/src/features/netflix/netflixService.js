import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";
import { netflixSlice } from "./netflixSlice";

const getGenres = async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data
}

const netflixService = {
    getGenres,
}

export default netflixService
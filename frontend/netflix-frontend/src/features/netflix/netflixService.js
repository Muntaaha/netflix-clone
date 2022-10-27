import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";
import { netflixSlice } from "./netflixSlice";

const getGenres = async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data
}
// Get Movies Trending/GenreWise

const createArrayFromFetchedMovies = (array, moviesArray, genres) => {
    // console.log('Hi2')
    // try {
    // if(array){
    //     console.log(array)
    // }
    array.forEach((movie) => {
        // console.log('Hi4')
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            // console.log('Hi3');
            const name = genres.find(({ id }) => id === genre);
            if (name){
                movieGenres.push(name.name)
            }
        });
        // console.log('Hi1')
        if(movie.backdrop_path){
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            })
        }
    });
        
    // } catch (error) {
    //     console.log("Didn't find any data")
    // }
};


const getMovieData = async (api_url, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++){
        const {data: {results},} = await axios.get(`${api_url}${paging ? `&page=${i}` : ""}`);
        createArrayFromFetchedMovies(results, moviesArray, genres);
    }
    // console.log(moviesArray);
    return moviesArray;
}

const trendingMovies = async (genres) => {
    return getMovieData(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
        genres,
        true
    )
}

const netflixService = {
    getGenres,
    trendingMovies,
}

export default netflixService
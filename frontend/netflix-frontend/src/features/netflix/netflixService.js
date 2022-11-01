import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../../utils/constants";
import { netflixSlice } from "./netflixSlice";

const getGenres = async () => {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres
}


// Get Movies Trending/GenreWise

const createArrayFromFetchedMovies = (array, moviesArray, genres) => {
    try {
    // if(array){
    //     console.log(array);
    // }
    array.forEach((movie) => {
        let movieGenres = [];
        movie.genre_ids.forEach((genre) => {
                const name = genres.find(({ id }) => id === parseInt(genre));
                if (name){
                    movieGenres.push(name.name)
            }
        });
        if(movie.backdrop_path){
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
                
            })
        }
    });
        
    } catch (error) {
        console.log(error.message)
    };
};


const getMovieData = async (api_url, genres, paging = false) => {
    let moviesArray = [];

    for (let i = 1; moviesArray.length < 60 && i < 10; i++){
        const {data: {results},} = await axios.get(`${api_url}${paging ? `&page=${i}` : ""}`);
        createArrayFromFetchedMovies(results, moviesArray, genres);
    }
    return moviesArray;
}

const fetchByGenre = async (type, genre, genres) => {
    return getMovieData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, 
        genres
    )
}

const trendingMovies = async (genres) => {
    return getMovieData(
        `${TMDB_BASE_URL}/trending/all/week?api_key=${API_KEY}`,
        genres,
        true
    )
}

const getWishlist = async (email) => {
    const response = await axios.get(`http://localhost:5000/api/wishlist/getWishlist/${email}`);
    return response.data.movies
}

const removeMovieFromWishlist = async (movieId, email) => {
    const response = await axios.put("http://localhost:5000/api/wishlist/removeFromwishlist", {
        email,
        movieId,
      });
    return response.data.movies
}

const netflixService = {
    getGenres,
    trendingMovies,
    fetchByGenre,
    getWishlist,
    removeMovieFromWishlist,
}

export default netflixService
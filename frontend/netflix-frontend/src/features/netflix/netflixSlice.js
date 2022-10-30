import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import netflixService from "./netflixService"

const initialState = {
    genres: [],
    wishlist: [],
    movies: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const getGenres = createAsyncThunk(
    'netflix/getGenres',
    async (_, thunkAPI) => {
        try {
            return await netflixService.getGenres()
        } catch (error) {
            const message = 
                (error.response && 
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const trendingMovies = createAsyncThunk(
    'netflix/trendingMovies',
    async (_, thunkAPI) => {
        try {
            const { netflix: {genres}, } = thunkAPI.getState()
            return await netflixService.trendingMovies(genres)
        } catch (error) {
            const message = 
                (error.response && 
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const fetchByGenre = createAsyncThunk(
    'netflix/fetchByGenre',
    async ({genres, type, genre}, thunkAPI) => {
        try {
            return await netflixService.fetchByGenre(type, genre, genres)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                            error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get User Wishlist
export const getWishlist = createAsyncThunk(
    'netflix/getWishlist',
    async (email, thunkAPI) => {
        try {
            return await netflixService.getWishlist(email)
        } catch (error) {
            const message = 
                (error.response && 
                error.response.data &&
                error.response.data.message) || 
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const netflixSlice = createSlice({
    name: 'netflix',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true 
                state.genres = action.payload
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true 
                state.message = action.payload
            })
            .addCase(trendingMovies.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true 
                state.movies = action.payload
            })
            .addCase(trendingMovies.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true 
                state.message = action.payload
            })
            .addCase(fetchByGenre.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true 
                state.movies = action.payload
            })
            .addCase(fetchByGenre.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true 
                state.message = action.payload
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false 
                state.isSuccess = true 
                state.wishlist = action.payload
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false 
                state.isError = true 
                state.message = action.payload
            })
    },
})

export const { reset } = netflixSlice.actions 
export default netflixSlice.reducer
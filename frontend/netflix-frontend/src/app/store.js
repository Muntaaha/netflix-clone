import { configureStore } from '@reduxjs/toolkit'
import netflixReducer from '../features/netflix/netflixSlice'

export const store = configureStore({
    reducer:{
        netflix: netflixReducer
    }
});
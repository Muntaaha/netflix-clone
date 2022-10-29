import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchByGenre, getGenres } from "../features/netflix/netflixSlice";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

const Movies = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const {genres, isLoading} = useSelector((state) => state.netflix.genres)
    const movies_by_genre = useSelector((state) => state.netflix.movies_by_genre)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
        console.log(genres)
    },[]);

    useEffect(() => {
        if(isLoading){
            dispatch(fetchByGenre({ genres, type: "movie" }));
            console.log(movies_by_genre)
        }
    }, [movies_by_genre, isLoading])
    
    if(isLoading){
        <NotAvailable />
    }
    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="movie" />
                {movies_by_genre.length ? <Slider movies_by_genre={movies_by_genre} /> : <NotAvailable />}
            </div>
        </Container>
    )
}
const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies

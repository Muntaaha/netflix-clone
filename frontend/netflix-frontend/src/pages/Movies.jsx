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
    const {genres, movies, isSuccess, isLoading, isError, message} = useSelector((state) => state.netflix)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if(!isLoading){
            dispatch(fetchByGenre({ genres, type: "movie" }));
        }
    }, [movies, isLoading])
    
    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid);
        else navigate("/login");
      });
    
      window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
      };

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="movie" />
                {movies?.length ? <Slider movies={movies} /> : <NotAvailable />}
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

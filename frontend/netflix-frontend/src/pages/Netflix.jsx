import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/images/home.jpg";
import MovieLogo from "../assets/images/homeTitle.webp";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { getGenres, trendingMovies, getWishlist } from "../features/netflix/netflixSlice";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

const Netflix = () => {
    
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(undefined);
    const { genres, wishlist, movies, isSuccess, isError, message } = useSelector(
      (state) => state.netflix
    )

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
          setEmail(currentUser.email);
      }
      else {navigate("/login");
      }
    });

    useEffect(() => {
      dispatch(getGenres());
      if(email){
        dispatch(getWishlist(email));
      }
    },[genres, wishlist, email])

    useEffect(() => {
      dispatch(trendingMovies());
    }, [])

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    } 

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img 
                    src={backgroundImage}
                    alt="backgroundImage"
                    className="background-image"
                />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="MovieLogo" />
                    </div>
                    <div className="buttons flex">
                        <button 
                            onClick={() => navigate("/player")}
                            className="flex j-center a-center"
                        >
                            <FaPlay /> Play
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies = {movies} wishlist={wishlist}/>
        </Container>
    )
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(20%);
    
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix

import React from 'react'
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { fetchByGenre } from "../features/netflix/netflixSlice"

const SelectGenre = ({ genres, type }) => {
    const dispatch = useDispatch()
    // console.log(genres)
    return (
        <Select
            className="flex"
            onChange={(e) => {
                dispatch(
                    fetchByGenre({
                    genres,
                    genre: e.target.value,
                    type,
                })
                );
            }}
            >
            {genres?.map((genre) => {
                return (
                <option value={genre.id} key={genre.id}>
                    {genre.name}
                </option>
                );
            })}
        </Select>
    )
}

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;

export default SelectGenre

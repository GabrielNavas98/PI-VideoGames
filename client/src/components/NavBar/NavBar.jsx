import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import n from './NavBar.module.css'

import SearchBar from "../SearchBar/SearchBar";
import { getAllVideogames, getGenres } from "../../redux/actions";


export default function NavBar () {
    
    const dispatch = useDispatch()
    const history = useHistory()

    function handleRefresh(e){
            e.preventDefault();
            dispatch(getAllVideogames());
            dispatch(getGenres())
            history.push('/home')
        }
    return (
        <header className={n.navbar}>
            <div>
                <NavLink exact to="/videogame/" className={n.link} activeClassName={n.active}>Create VideoGame</NavLink>
            </div>
            <div>
                <NavLink exact to="/home" className={n.link} activeClassName={n.active} onClick={(e) => handleRefresh(e)}>Home</NavLink>
            </div>
            <div>
                <SearchBar />             
            </div>
        </header>
    )
}

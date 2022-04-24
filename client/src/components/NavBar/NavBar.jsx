import React from "react";
import { NavLink } from "react-router-dom";

import n from './NavBar.module.css'

import SearchBar from "../SearchBar/SearchBar";


export default function NavBar () {
    return (
        <header className={n.navbar}>
            <div>
                <NavLink exact to="/videogame/" className={n.link} activeClassName={n.active}>Create VideoGame</NavLink>
            </div>
            <div>
                <NavLink exact to="/home" className={n.link} activeClassName={n.active}>Home</NavLink>
            </div>
            <div>
                <SearchBar />             
            </div>
        </header>
    )
}

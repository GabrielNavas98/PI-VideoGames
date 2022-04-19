import React from "react";
import { NavLink } from "react-router-dom";

import n from './NavBar.module.css'

import SearchBar from "../SearchBar/SearchBar";


export default function NavBar () {
    return (
        <nav className={n.navbar}>
            <div>
                <ul className={n.list}>
                    <li className={n.list_item}>
                    <NavLink exact to="/create">Create VideoGame</NavLink>
                    <NavLink exact to="/home">Home</NavLink>
                    <SearchBar />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

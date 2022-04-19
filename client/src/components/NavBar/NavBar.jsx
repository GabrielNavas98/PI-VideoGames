import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";


export default function NavBar () {
    return (
        <div>
            <Link exact to="/create">Create VideoGame</Link>
            <Link exact to="/home">Home</Link>
            <SearchBar/>
            <h1>soy el Nav</h1>
        </div>
    )
}

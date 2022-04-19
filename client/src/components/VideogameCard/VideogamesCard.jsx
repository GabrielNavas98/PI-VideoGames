import React from 'react';

import './Videogame.css'


export default function VideogameCard ({name, img, genres, id }) {
    return(
        <div className="card" width= '8rem' key={id}>
            <img src={img} className="card-img-top" alt="img not found"/>
            <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{genres}</p>
            </div>
        </div>
        
    )
};


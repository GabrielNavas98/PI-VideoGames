import React from 'react';

import s from './Videogame.module.css'


export default function VideogameCard ({name, img, genres, id }) {
    
    return(
        <div className={s.card} key={id}>
                <div className={s.container}>
                    <img src={img} alt="img not found"/>
                </div>
                <div className={s.info}>
                    <h3>{name}</h3>
                    <p>{genres}</p>
                </div>
        </div>
    )
};


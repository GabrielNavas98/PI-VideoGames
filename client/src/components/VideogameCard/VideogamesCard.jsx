import React from 'react';

import s from './Videogame.module.css'


export default function VideogameCard ({name, img, genres, id, rating }) {
    if(!img){
        img = 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=600/uploads/users/30/posts/25489/image/pf.jpg'
    }
    return(
        <div className={s.card} key={id}>
                <div className={s.container}>
                    <img src={img} alt=""/>
                </div>
                <div className={s.info}>
                    <h3>{name}</h3>
                    <p>{genres}</p>
                    <h4>Rating: {rating}</h4>
                </div>
        </div>
    )
};


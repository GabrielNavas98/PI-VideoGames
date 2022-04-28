import React from "react";
//import { useState } from "react";

import style from './Paginado.module.css'

export default function Paginado({gamesPerPg, allVideogames, paginado, currentPg}){
    const pageNumbers = []
    

    for(let i = 1; i <= Math.ceil(allVideogames/gamesPerPg); i++){
        pageNumbers.push(i)
    }
    //console.log(pageNumbers.map())

    const renderPage  = pageNumbers.map((number) => {
        return(
            <li className={style.number} key={number} >
                <button className={currentPg === number? style.linkActive : style.link} href="/#" onClick={() => paginado(number)} >{number}</button>
            </li>
        )
    })

    return(   
        <nav className={style.container}>
            <ul className={style.paginas}>                
                { 
                    pageNumbers && 
                        renderPage
                }
            </ul>
        </nav>
    )
}


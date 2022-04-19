import React from "react";

import './Paginado.css'

export default function Paginado({gamesPerPg, allVideogames, paginado}){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allVideogames/gamesPerPg); i++){
        pageNumbers.push(i)
    }
    //console.log(pageNumbers.map())

    return(
        <>    
            <nav className="container">
                <ul className="paginas">
                    { pageNumbers && 
                        pageNumbers.map(number => (
                            <li className="number" key={number}>
                                <button className='link' href="/#" onClick={() => paginado(number)}>{number}</button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}


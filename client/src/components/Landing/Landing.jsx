import React from 'react'
import { Link } from 'react-router-dom';

import style from './Landing.module.css'

function Landing () {
        return (
                <div className={style.container}>
                    <h1>Welcome to VIDEOGAMES</h1>
                    <Link to="/home">
                        <button className={style.btn_land}>Home</button>
                    </Link>
                </div>
        )
}
export default Landing;
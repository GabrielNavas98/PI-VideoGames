import React from 'react'
import { Link } from 'react-router-dom';

import './Landing.css'

function Landing () {
        return (
                <div className='full-inner'>
                    <h1>Welcome to VIDEOGAMES</h1>
                    <Link to="/home">
                        <button>Home</button>
                    </Link>
                </div>
        )
}
export default Landing;
const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db')
const { API_KEY } = process.env;
const router = Router();

const apiGenre = async () => {
    const algo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    //console.log(algo)
    const genre = algo.data.results.map(gen => gen.name)
    //console.log(genre)
    genre.forEach(gen => {
         Genre.findOrCreate({
             where: {name : gen}
         })
    })
    const allGenre = await Genre.findAll();
    //console.log(allGenre)
    return allGenre
}




router.get('/', async (req, res) => {
    try{
        res.status(200).json(await apiGenre())
    }catch(err){
        res.sendStatus(404)
    }
})

module.exports = router
const { Router } = require('express')
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db')
const { API_KEY } = process.env;
const router = Router();

const getApiGameDetail = async (id) => {
    const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    //console.log(data) me trae el detail del juego
    const info = {
        id: data.id,
        name: data.name,
        background_image: data.background_image,
        genres: data.genres.map(gen => {
            return {
                name: gen.name
            }
        }),
        description: data.description_raw,
        released: data.released,
        rating: data.rating,
        platforms: data.parent_platforms.map(plat => {
            return plat.platform.name;
        })
    }
    //console.log(info) //me trae la info correctamente
    return info
}


const getDBGames = async (id) => {
    let gameDB = await Videogame.findByPk(id, {
        include: [
            {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Platform,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        ]        
    })
    return gameDB
}





router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if(id.length < 6 ){
        try{
            res.status(200).json(await getApiGameDetail(id))
        }catch(err){
            res.status(400).json({msg: 'err'})
        }
    }else {
        try{
            res.status(200).json(await getDBGames(id))
        }catch(err){
            res.status(400).json({msg: 'errdb'})
        }
    }
})

//localhost:3001/videogame/id=3498

module.exports = router
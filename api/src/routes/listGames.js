const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db')
const { API_KEY } = process.env;
const router = Router();

const getApiGames = async () => {
    let arrayGames = [];
    //los primeros 100 juegos
    for(let i = 1; i < 6; i++) {
        const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        arrayGames.push(apiGames.data.results)
        arrayGames.flat().length
    }
    const infoGames = arrayGames.flat().map(game => {
        return{
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            genres: game.genres.map(gen => {
                return {
                    id: gen.id,
                    name: gen.name
                }
            }),
            released: game.released,
            rating: game.rating,
            platform: game.parent_platforms.map(elem => {
                return {
                    id: elem.platform.id,
                    name: elem.platform.name                    
                }    
            })
        }
    })
    return infoGames;
}


const getDBGames = async () => {
    return await Videogame.findAll({
        include: [{
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
        }]
    })
}

const getAllGames = async () => {
    const apiGames = await getApiGames();
    const dbGames = await getDBGames();
    const allGames = apiGames.concat(dbGames);
    return allGames
}

router.get('/', async (req, res) => {
    const { name } = req.query //obtengo la query
    let games = await getAllGames()
    //si tengo el name del juego por query
    if (name){
        let gamesName = games.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
        if(gamesName.length){
            res.status(200).json(gamesName)
        }else{
            res.status(404).json({msg: 'Game not found'})
        }
    }else {
        res.status(200).json(games)
    }

})

module.exports = router;
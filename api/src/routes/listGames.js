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

const getGamesName = async (name) => {
    let arr = [];
    const gamesPerName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    arr.push(gamesPerName.data.results)
    arr.flat().length
    //console.log(arr)
    const infoGameName = arr.flat().map(game => {
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
    let gamesDB = await getDBGames()
    let filtradosDB = gamesDB.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    let allName = infoGameName.concat(filtradosDB)

    //console.log(infoGameName[0])
    return allName
}

router.get('/', async (req, res) => {
    const { name } = req.query //obtengo la query
    let allgames = await getAllGames() //traigo los juegos DB + API

    //si me pasan 'name: ....' por query
    if (name){
        //let gamesName = games.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
        let games = await getGamesName(name) //uso la ruta de la api
        games.splice(15)
        if(games.length){
            res.status(200).json(games)
        }else{
            res.status(404).json({msg: 'Game not found'})
        }
    }else { //si no me pasan query
        res.status(200).json(allgames)
    }

})

module.exports = router;
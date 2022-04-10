
const axios = require('axios')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env;

const getApiGames = async () => {
    const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const info = await apiGames.data.results.map(game => {
        return{
            id: info.id,
            name: info.name,
            background_image: info.background_image,
            genres: info.genres.map(gen =>{
                return{
                    id: gen.id,
                    name: gen.name
                }
            })
        }
    })
    return info;
}

const getDBGames = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ('name'),
            through: {
                attributes: []
            }
        }
    })
}

const getAllGames = async () => {
    const apiGames = await getApiGames();
    const dbGames = await getDBGames();
    const allInfo = apiGames.concat(dbGames);
    return allInfo
}

module.exports = {   
    getAllGames
}
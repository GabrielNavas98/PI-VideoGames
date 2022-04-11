const { Router } = require('express')
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db')
const { API_KEY } = process.env;
const router = Router();

const getApiGameDetail = async (id) => {
    const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
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
    return info
}

const getDBGames = async (id) => {
    return await Videogame.findAll({
        where: {
            id: `${id}`
        },
        include: [
            { model: Genre, attributes: ['name'] },
            { model: Platform, attributes: ['name'] }
        ]
        
    })
}

const allGameDetail = async (id) => {
    const apiDetail = await getApiGameDetail(id);
    const dbDetail = await getDBGames(id);
    const allDetail = apiDetail.concat(dbDetail);
    return allDetail
}

router.get('/', async (req, res) => {
    const { id } = req.params;
    let detail = await allGameDetail(id)
    res.status(200).json(detail)
})

module.exports = router
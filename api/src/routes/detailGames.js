const { Router } = require('express')
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db')
const { API_KEY } = process.env;
const router = Router();


const getApiDetail = async (id) => {
    const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const infoDetail = {
        id: data.id,
        name: data.name,
        background_image: data.background_image,
        genres: data.genres.map(gen => {
            return {
                id: gen.id,
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
    return infoDetail;
}

const getDBDetail = async (id) => {
    return await Videogame.findAll({
        where: {
            id: `${id}`,
            include: {
                model: Genre,
                attributes: ['name'],
                through : {
                    attributes: []
                }
            },
            include: {
                model: Platform,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        }
    })
}

const allDetails = async (id) => {
    const apiDetail = await getApiDetail(id);
    const dbDetail = await getDBDetail(id);
    const details = apiDetail.concat(dbDetail);
    return details
}

router.get('/', async (req, res) => {
    const { id } = req.params
    if(id){
        res.status(200).json(allDetails(id))
    }else{
        res.status(404).json({msg: 'game id not found'})
    }
})

module.exports = router;
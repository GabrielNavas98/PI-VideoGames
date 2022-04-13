const { Router } = require('express')
const { Videogame, Genre, Platform} = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    const { name, description, released, rating, platformId, genreId, background_image, inBd } = req.body;
    //console.log(name)
    
    const gameCreated = await  Videogame.create({
        name, description, released, rating, background_image, inBd
    });

    const genreDB = await Genre.findAll({
        where: {
            name: genreId
        }
    })

    const platformDB = await Platform.findAll({
        where: {
            name: platformId
        }
    });

    gameCreated.addGenre(genreDB)

    res.status(200).send(gameCreated)
});



module.exports = router
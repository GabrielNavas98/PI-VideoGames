const { Router } = require('express')
const { Videogame, Genre, Platform} = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    let { name, description, released, rating, platforms, genres, background_image, inBd } = req.body;
    //console.log(name)
    if(!background_image){
        background_image = 'https://cdn.icon-icons.com/icons2/2483/PNG/512/defect_analysis_icon_149951.png'
    }
    
    try{
    const gameCreated = await  Videogame.create({
        name, description, released, rating, background_image, inBd
    });

        const genreDB = await Genre.findAll({
            where: {
                name: genres
            }
        });
    
        const platformDB = await Platform.findAll({
            where: {
                name: platforms
            }
        })
    
    
        await gameCreated.addGenre(genreDB);
        await gameCreated.addPlatform(platformDB)
    
        res.status(200).send(gameCreated)
    }catch(err){
        res.status(400).send(err)
    }
});



module.exports = router
const { Router } = require('express');
const axios = require('axios');
const { Platform } = require('../db')
const { API_KEY } = process.env;
const router = Router();

const apiPlatform = async () => {
    let arrayGames = [];
    //Platform de los primeros 100 juegos
    for(let i = 1; i < 6; i++) {
        const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        //console.log(apiGames)
        arrayGames.push(apiGames.data.results)
        arrayGames.flat().length
        //console.log(arrayGames)
    }
    //console.log(arrayGames)
    const info = arrayGames.flat().map(e => e.parent_platforms)
    const filter = info.flat().map(e => e.platform.name) //array de plataformas repetidas

    for(var i = filter.length -1; i >= 0; i--){ //elimino repetidos
        if(filter.indexOf(filter[i]) !== i) filter.splice(i,1);
    }

    filter.forEach(plat => {
        Platform.findOrCreate({
             where: {name : plat}
        })
    })
    
    const allPlatform = await Platform.findAll();
    //console.log(filter)
    return allPlatform
}
// apiPlatform()

router.get('/', async (req, res) => {
    try{
        res.status(200).json(await apiPlatform())
    }catch(err){
        res.sendStatus(404)
    }
})

module.exports = router
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllGames } = require('./listGames.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    const { name } = req.query //obtengo la query
    let games = await getAllGames()
    //si tengo el name del juego por query
    if (name){
        let gamesName = await games.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
        if(gamesName.length){
            res.status(200).json(gamesName)
        }
        res.status(404).json({msg: 'Game not found'})
    }else {
        res.status(200).json(games)
    }
})

module.exports = router;

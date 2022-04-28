const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRoute = require('./listGames');
const videogameDetailRoute = require('./detailGames');
const genreRoute = require('./listGenres');
const platformRoute = require('./listPlatforms')
const postGameRoute = require('./postGame');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogameRoute);
router.use('/videogames', videogameDetailRoute);
router.use('/genres', genreRoute);
router.use('/platforms', platformRoute)
router.use('/videogame/', postGameRoute);


module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRoute = require('./listGames');
const videogameDetailRoute = require('./detailGames');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogameRoute);
router.use('/videogames/:id', videogameDetailRoute);



module.exports = router;

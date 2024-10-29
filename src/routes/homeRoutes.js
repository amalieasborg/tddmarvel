const express = require('express');
const marvelController = require('../controllers/marvelController');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

//opret helt (create)
router.post('/', validationMiddleware.validateHero, marvelController.createHero);

//læs alle helte (read)
router.get ('/', marvelController.getAllHeroes);

//læs en helt (read)
router.get('/:id',marvelController.getHeroById);

//opdater helt (update)
router.put('/:id', validationMiddleware.validateHero, marvelController.updateHero);

//slet helt (delete)
router.delete('/:id',marvelController.deleteHero);

module.exports = router;
// In your homeRoutes.js
const express = require('express');
const marvelController = require('../controllers/marvelController');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

// Create a hero
router.post('/', validationMiddleware.validateHero, marvelController.createHero);

// Read all heroes
router.get('/', marvelController.getAllHeroes);

// Read a hero by ID
router.get('/:id', marvelController.getHeroById);

// Update a hero
router.put('/:id', validationMiddleware.validateHero, marvelController.updateHero);

// Delete a hero
router.delete('/:id', marvelController.deleteHero);

module.exports = router;

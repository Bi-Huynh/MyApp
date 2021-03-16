const express = require('express');
const router = express.Router();
// const musicController = require('./controller');
import { home, create, getSong } from './controller.js';

router.get('/', home);
router.get('/create', create);
router.get('/:id', getSong);

// router.get('/', musicController.home);
// router.get('/create', musicController.create);
// router.get('/:id', musicController.getSong);

export { router };

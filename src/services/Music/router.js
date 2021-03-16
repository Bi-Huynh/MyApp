import express from 'express';
import { home, create, getSong } from './controller.js';

const router = express.Router();

router.get('/', home);
router.get('/create', create);
router.get('/:slug', getSong);

export { router };

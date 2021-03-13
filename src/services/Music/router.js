const express = require('express');
const router = express.Router();
const musicController = require('./controller');

router.get('/', musicController.home);
router.get('/create', musicController.create);

module.exports = router;

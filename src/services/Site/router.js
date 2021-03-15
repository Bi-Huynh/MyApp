const express = require('express');
const router = express.Router();
const siteController = require('./controller');

router.get('/', siteController.home);

module.exports = router;

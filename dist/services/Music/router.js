"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _controller = require("./controller.js");

const express = require('express');

const router = express.Router(); // const musicController = require('./controller');

exports.router = router;
router.get('/', _controller.home);
router.get('/create', _controller.create);
router.get('/:id', _controller.getSong); // router.get('/', musicController.home);
// router.get('/create', musicController.create);
// router.get('/:id', musicController.getSong);
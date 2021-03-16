"use strict";

var _router = _interopRequireDefault(require("./Music/router.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const musicRouter = require('./Music/router');
const siteRouter = require('./Site/router');

function router(app) {
  app.use('/', siteRouter);
  app.use('/music', _router.default);
}

exports.router = router;
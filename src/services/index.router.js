const musicRouter = require('./Music/router');
const siteRouter = require('./Site/router');

function router(app) {
    app.use('/', siteRouter);
    app.use('/music', musicRouter);
}

module.exports = router;

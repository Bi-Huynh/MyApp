// const musicRouter = require('./Music/router');
import musicRouter from './Music/router.js';
const siteRouter = require('./Site/router');

function router(app) {
    app.use('/', siteRouter);
    app.use('/music', musicRouter);
}

exports.router = router;

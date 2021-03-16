import { router as musicRouter } from './Music/router.js';
import { router as siteRouter } from './Site/router.js';

function router(app) {
    app.use('/', siteRouter);
    app.use('/music', musicRouter);
}

export { router };

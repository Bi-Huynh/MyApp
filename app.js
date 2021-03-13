const express = require('express');

const router = require('./src/services/index.router');
const database = require('./configs/database/connect.mongodb');

const app = express();

const port = 3000;

router(app);
database.connect();

app.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
});

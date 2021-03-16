// require('dotenv').config();
// để file .env ở ngoài thư mục root thì nó sẽ chạy
// nếu muốn để trong file khác thì trong function config truyền object system (read file doc dotenv npm)

// const mongoose = require('mongoose');

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const database = {
    connect: async function () {
        try {
            await mongoose.connect(process.env.PATH_DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
            console.log('Connect successfully');
        } catch (error) {
            console.log('Connect failed: ' + error.message);
        }
    },
};

export { database };

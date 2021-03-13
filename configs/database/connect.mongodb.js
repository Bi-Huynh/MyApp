require('dotenv').config();
// để file .env ở ngoài thư mục root thì nó sẽ chạy
// nếu muốn để trong file khác thì trong function config truyền object system (read file doc dotenv npm)

const mongoose = require('mongoose');

async function connect() {
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
}

module.exports = { connect };

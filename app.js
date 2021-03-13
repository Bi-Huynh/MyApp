const express = require('express');
const router = require('./src/services/index.router');
const database = require('./configs/database/connect.mongodb');
const methodOverride = require('method-Override');
const path = require('path');

const app = express();

database.connect();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(
    express.urlencoded({
        extended: true,
    })
);
// sử dụng middleware để mã hóa req.body, có thể sử dụng được nó tại express từ -v 4.16, nếu sử dụng -v cũ hơn thì phải cài npm body-parser để mã hóa req.body
app.use(express.json());
// thêm thằng json để có thể submit những dữ liệu không phải html như XMLHttp, fetch,....
// dùng để gửi code từ js lên để submit

app.use(methodOverride('_method'));
// override method này là để override lại các phương thức trong mongoose
// sử dụng nó để có thể sử dụng thư viện override dùng trong soft delete (xóa mềm => không xóa hẳng đi)

app.use(express.static(path.join(__dirname, 'public')));
// phải có thằng này để nó có thể đọc các file css img ....

router(app);

app.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
});

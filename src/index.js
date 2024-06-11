var path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express() // trả về 1 đối tượng app để xây dụng web -+
const port = 3001 // cổng khi chạy

const route = require("./routers/index");
const db = require("./config/db/index");
const methodOverride = require('method-override')

// Connect to DB
db.connect();

app.use(express.urlencoded({
  extended: true
}));; // gọi tới phương thức middleware xử lý
app.use(express.json()); // 

app.use(express.static(path.join(__dirname, 'public')));
// gán đường dẫn cho ảnh public 

// HTTP logger
app.use(morgan('combined'));
app.use(methodOverride('_method'))

// Template engines
// app.engine('handlebars', handlebars());
app.engine('hbs', handlebars.engine({
  extname: '.hbs', // config tên
  helpers: { // hàm hỗ trợ
    sum: (a, b) => a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

// định nghĩa router
// action --> Dispatcher --> Function handler 

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
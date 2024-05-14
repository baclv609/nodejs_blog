var path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express() // trả về 1 đối tượng app để xây dụng web -+
const port = 3000 // cổng khi chạy

const route = require("./routers/index")

app.use(express.urlencoded({
  extended: true
}));; // gọi tới phương thức middleware xử lý
app.use(express.json()); // 

app.use(express.static(path.join(__dirname, 'public')));
// gán đường dẫn cho ảnh public 

// HTTP logger
app.use(morgan('combined'));
// Template engines
// app.engine('handlebars', handlebars());
app.engine('hbs', handlebars.engine({
  extname: '.hbs' // config tên
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// route init
route(app);

// định nghĩa router
// action --> Dispatcher --> Function handler 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
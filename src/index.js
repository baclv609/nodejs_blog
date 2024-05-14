var path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express() // trả về 1 đối tượng app để xây dụng web 
const port = 3000 // cổng khi chạy

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
// console.log("PATH", path.join(__dirname, 'resources/views'));

// định nghĩa router
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});
app.get('/search', (req, res) => {
  res.render('search');
});
app.post('/search', (req, res) => {
  console.log(req.body);
  res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
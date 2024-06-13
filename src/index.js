var path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express(); // trả về 1 đối tượng app để xây dụng web -+
const port = 3001; // cổng khi chạy

const route = require("./routers/index");
const db = require("./config/db/index");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middleware/sortMiddleware");
const { types } = require("util");

// Connect to DB
db.connect();

app.use(
  express.urlencoded({
    extended: true,
  })
); // gọi tới phương thức middleware xử lý
app.use(express.json()); //

app.use(express.static(path.join(__dirname, "public")));
// gán đường dẫn cho ảnh public

// HTTP logger
app.use(morgan("combined"));
app.use(methodOverride("_method"));
app.use(sortMiddleware); // custom middleware

// Template engines
// app.engine('handlebars', handlebars());
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs", // config tên
    helpers: {
      sum: (a, b) => a + b,
      sortable: (fiedName, sort) => {
        const sortType = fiedName === sort.column ? sort.type : 'default';

        const icons = {
          default: '<span class="material-symbols-outlined">unfold_more</span>',
          asc: '<span class="material-symbols-outlined">arrow_drop_up</span>',
          desc: '<span class="material-symbols-outlined">arrow_drop_down</span>'
        }
        const types = {
          asc: 'desc',
          desc: 'asc',
          default: 'asc'
        }
        const icon = icons[sortType];
        const type = types[sortType];
        return `<a href="?_sort&column=${fiedName}&type=${type}">${icon}</a>`
      }
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// route init
route(app);

// định nghĩa router
// action --> Dispatcher --> Function handler

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

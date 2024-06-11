const newRouter = require("./news")
const coursesRouter = require("./courses")
const meRouter = require("./me")
const siteRouter = require("./site")

function route(app) {
    app.get('/', siteRouter);

    app.use('/news', newRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);

    app.get('/search', (req, res) => {
        res.render('search');
    });
}
module.exports = route;
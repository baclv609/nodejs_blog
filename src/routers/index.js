const newRouter = require("./news")
const siteRouter = require("./site")

function route(app) {
    app.get('/', siteRouter);
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
    // app.get('/news', newRouter(app));

    app.use('/news', newRouter);

    app.get('/search', (req, res) => {
        res.render('search');
    });
}
module.exports = route;
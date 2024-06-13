const newRouter = require("./news")
const coursesRouter = require("./courses")
const meRouter = require("./me")
const siteRouter = require("./site")
const apiCourseRouter = require("./apicourse")

function route(app) {
    app.get('/', siteRouter);

    app.use('/news', newRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/api/courses', apiCourseRouter);

    app.get('/search', (req, res) => {
        res.render('search');
    });

    
}
module.exports = route;
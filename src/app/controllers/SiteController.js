const courses = require("../models/Courses");// import model vào controller
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    // [GET] /home
    async index(req, res, next) {
        // try {
        //     const course = await courses.find({});
        //     res.json(course);
        //     // không có lỗi thì trả về dữ liệu dạng json
        // } catch (err) {
        //     next(err); // nó sẽ lọt vào middleware bên ngoài
        //     res.status(500).json({ error: "Error fetching data from database" });
        // }
        courses.find({})
            .then(courses => {
                res.render('home', { courses: mutipleMongooseToObject(courses) })
                // truyền vào 1 object, object này chứa 1 key courses và giá trị của key courses là mảng courses
            })
            .catch(next); // truyền vào 1 fnc và gọi tới fnc next
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController; 
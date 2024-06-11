const courses = require("../models/Courses");// import model vào controller
const { mongooseToObject, mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
    // [post] //stored/courses
    storedCourses(req, res, next) {
        courses.find({})
            .then(courses => res.render('me/stored-courses', {
                courses: mutipleMongooseToObject(courses) // chuyển từ mảng mongoose sang mảng object 
            }))
            .catch(next);
    }
}

module.exports = new MeController; 
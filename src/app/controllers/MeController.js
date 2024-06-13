const courses = require("../models/Courses");// import model vào controller
const { mongooseToObject, mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
    // [post] //stored/courses
    storedCourses(req, res, next) {
        Promise.all([courses.find({}), courses.countDocumentsDeleted()]) // trả về mảng chứa 2 phần tử
            .then(([courses, deletedCount]) => {

                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount: deletedCount, // số lượng document đã xóa
                })
            })
            .catch(next);
    }
    // [GET] /trash/courses
    trashCourses(req, res, next) {
        courses.findWithDeleted({ deleted: true }) // will return only DELETED documents
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController; 
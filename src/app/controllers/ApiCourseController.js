const courses = require("../models/Courses");// import model vào controller

class ApiCourseController {
    async index1(req, res) {
        const courses1 = await courses.find({});
        res.json({ message: "Thanh cong", data: courses1 });
    }
}

module.exports = new ApiCourseController; 
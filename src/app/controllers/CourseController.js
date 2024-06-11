const courses = require("../models/Courses");// import model vào controller
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // req.params.slug; // lấy slug từ url
        courses.findOne({ slug: req.params.slug })
            .then(course => {
                // res.json(course);
                // res.render('courses/show', { course: mutipleMongooseToObject(course) });
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
        // findOne: tìm 1 phần tử trong database theo điều kiện slug: req.params.slug 
        // sau đó trả về dữ liệu course
        // nếu tìm thấy thì trả về dữ liệu course dưới dạng object
        // nếu không tìm thấy thì bắt lỗi 
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        courses.findById(req.params.id) // tìm id trong database
            .then(course => res.render('courses/edit', { // render ra trang  edit
                course: mongooseToObject(course) // chuyển từ mongoose sang object
            }))
            .catch(next);
    }

    // [post] /courses/store
    store(req, res, next) {
        // res.json(req.body);
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`
        const course = new courses(formData);
        course.save()
            .then(() => res.redirect(`/`))
            .catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        // res.json(req.body);
        courses.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id/delete
    delete(req, res, next) {
        courses.deleteOne({ _id: req.params.id })
        .then(()=> res.redirect('back')) // xóa xong sẽ qua trỏ về trang trước đó
        .catch(next)
    }
}

module.exports = new CourseController; 
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
        const formData = { ...req.body };
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
        courses.delete({ _id: req.params.id }) // xóa mềm
            .then(() => res.redirect('back')) // xóa xong sẽ qua trỏ về trang trước đó
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        courses.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        courses.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')) // xóa xong sẽ qua trỏ về trang trước đó
            .catch(next)
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        // res.json(req.body.action);
        switch (req.body.action) {
            case "delete":
                courses.delete({ _id: { $in: req.body.coursesId } }) // $in loop qua array
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case "restore":
                courses.restore({ _id: { $in: req.body.coursesId } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case "deleteOne": // xóa cứng       
                // deleteMany xóa cứng nhiều phần tử đã chọn 
                courses.deleteMany({ _id: { $in: req.body.coursesId } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: "Action is invalid" })
                break;
        }
    }

}

module.exports = new CourseController; 
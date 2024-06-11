const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater'); // import slug để tạo slug
const mongooseDelete = require('mongoose-delete'); // import mongoose-delete để xóa mềm 



const Schema = mongoose.Schema;

// Schema tạo ra các field trong database   
const courses = new Schema({
    name: { type: String, default: '', maxLength: 255, require: true },
    decription: { type: String, maxLength: 600 },
    image: { type: String, default: '' },
    videoID: { type: String },
    lever: { type: String },
    slug: { type: String, slug: "name", unique: true }, // tạo slug từ name 
    // unique: true để không trùng slug 
}, {
    timestamps: true // tự tạo ra 2 field là createdAt và updatedAt
});

mongoose.plugin(slug);
// add plugin
courses.plugin(mongooseDelete, { 
    deletedAt: true, // lưu thời gian xóa 
    overrideMethods: 'all', 
}) // sử dụng mongoose-delete để xóa mềm 
module.exports = mongoose.model('courses', courses);
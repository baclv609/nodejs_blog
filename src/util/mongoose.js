const { default: mongoose } = require("mongoose");

module.exports = {
    mutipleMongooseToObject: function (mongooseArray) {
        return mongooseArray = mongooseArray.map(course => course.toObject());
    }, // chuyển từ mảng mongoose sang mảng object
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
        // nếu có dữ liệu thì trả về dữ liệu đó, không có thì trả về dữ liệu ban đầu
    } 
}
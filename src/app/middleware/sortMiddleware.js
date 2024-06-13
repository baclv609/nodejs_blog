module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = { // res.locals là biến toàn cục, có thể truy cập ở bất kỳ đâu 
        enabled: false, // mặc định là false
        type: 'default', // type mặc định
    };

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        }) // gán giá trị từ query vào res.locals._sort
    }
    next()
}
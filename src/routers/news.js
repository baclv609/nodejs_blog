// nạp vào
const express = require('express');
const router = express.Router();

const newsController = require("../app/controllers/NewsController");
// // const route = require('.');

// newsController.show;
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;

// const route = (app) => {
//     app.get('news', newsController.index);
//     app.get('news/:slug', newsController.show);
// }
// module.exports = route;
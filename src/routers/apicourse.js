// nạp vào
const express = require('express');
const router = express.Router();

const ApiCourseController = require("../app/controllers/ApiCourseController");

router.get('/', ApiCourseController.index1);

module.exports = router;
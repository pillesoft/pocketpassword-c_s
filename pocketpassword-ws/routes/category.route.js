const express = require('express');
const router = express.Router();

const controller = require('../controllers/category.controller');
router.get('/', controller.list);
router.get('/test', controller.test);
router.post('/create', controller.category_create);

module.exports = router;

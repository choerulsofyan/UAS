const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const categoryController = require('../controllers/category');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', categoryController.getIndexCategory);
// get one category
router.get('/:category_id', categoryController.getDetailCategory);
// post category POST /api/category gets JSON bodies
router.post('/', urlencodedParser, categoryController.storeCategory);
// update category
router.post('/:category_id', urlencodedParser, categoryController.updateCategory);
// delete category
router.post('/:category_id/destroy', urlencodedParser, categoryController.destroyCategory);

// search category by judul
router.post('/search/:judul', urlencodedParser, categoryController.searchCategory);

module.exports = router;
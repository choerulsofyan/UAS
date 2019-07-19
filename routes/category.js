const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const categoryController = require('../controllers/category');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', categoryController.getAllCategory);
// search category by judul
router.post('/search/:name', urlencodedParser, categoryController.searchCategory);
// get one category
router.get('/:category_id', categoryController.getDetailCategory);
// post category POST /api/category gets JSON bodies
router.post('/', urlencodedParser, categoryController.storeCategory);
// update category
router.put('/:category_id', urlencodedParser, categoryController.updateCategory);
// delete category
router.delete('/:category_id/destroy', urlencodedParser, categoryController.destroyCategory);

module.exports = router;
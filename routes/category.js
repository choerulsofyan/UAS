const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const categoryController = require('../controllers/category');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', categoryController.getAllCategory);
// get one category
router.get('/:category_id', categoryController.getDetailCategory);
// post category POST /api/category gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, categoryController.storeCategory);
// update category
router.put('/:category_id', urlencodedParser, auth.verifyToken, categoryController.updateCategory);
// delete category
router.delete('/:category_id/destroy', urlencodedParser, auth.verifyToken, categoryController.destroyCategory);
// search category by title
router.post('/search/:name', urlencodedParser, categoryController.searchCategory);

module.exports = router;
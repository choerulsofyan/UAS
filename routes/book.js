const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const bookController = require('../controllers/book');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', bookController.getIndexBook);
// get one book
router.get('/:book_id', bookController.getDetailBook);
// post book POST /api/book gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, bookController.storeBook);
// update book
router.put('/:book_id', urlencodedParser, auth.verifyToken, bookController.updateBook);
// delete book
router.delete('/:book_id/destroy', urlencodedParser, auth.verifyToken, bookController.destroyBook);
// search book by judul
router.post('/search/:judul', urlencodedParser, bookController.searchBook);

module.exports = router;
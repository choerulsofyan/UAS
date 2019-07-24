const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const authorController = require('../controllers/author');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', authorController.getAllAuthor);
// get one author
router.get('/:author_id', authorController.getDetailAuthor);
// post author POST /api/author gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, authorController.storeAuthor);
// update author
router.put('/:author_id', urlencodedParser, auth.verifyToken, authorController.updateAuthor);
// delete author
router.delete('/:author_id/destroy', urlencodedParser, auth.verifyToken, authorController.destroyAuthor);
// search author by title
router.post('/search/:title', urlencodedParser, authorController.searchAuthor);

module.exports = router;
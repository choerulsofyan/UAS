const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const publisherController = require('../controllers/publisher');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', publisherController.getAllPublisher);
// get one publisher
router.get('/:publisher_id', publisherController.getDetailPublisher);
// post publisher POST /api/publisher gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, publisherController.storePublisher);
// update publisher
router.put('/:publisher_id', urlencodedParser, auth.verifyToken, publisherController.updatePublisher);
// delete publisher
router.delete('/:publisher_id/destroy', urlencodedParser, auth.verifyToken, publisherController.destroyPublisher);
// search publisher by name
router.post('/search/:name', urlencodedParser, publisherController.searchPublisher);

module.exports = router;
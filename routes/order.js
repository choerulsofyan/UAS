const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const orderController = require('../controllers/order');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', orderController.getAllOrder);
// get one order
router.get('/:order_id', orderController.getDetailOrder);
// post order POST /api/order gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, orderController.storeOrder);
// update order
router.put('/:order_id', urlencodedParser, auth.verifyToken, orderController.updateOrder);
// delete order
router.delete('/:order_id/destroy', urlencodedParser, auth.verifyToken, orderController.destroyOrder);
// search order by title
router.post('/search/:title', urlencodedParser, orderController.searchOrder);

module.exports = router;
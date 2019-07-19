const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

const userController = require('../controllers/user');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', userController.getAllUser);
// get one user
router.get('/:user_id', userController.getDetailUser);
// post user POST /api/user gets JSON bodies
router.post('/', urlencodedParser, userController.storeUser);
// update user
router.put('/:user_id', urlencodedParser, userController.updateUser);
// delete user
router.delete('/:user_id/destroy', urlencodedParser, userController.destroyUser);

// search user by judul
router.post('/search/:username', urlencodedParser, userController.searchUser);

module.exports = router;
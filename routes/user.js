const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

const userController = require('../controllers/user');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', userController.getAllUser);
// get one user
router.get('/:user_id', userController.getDetailUser);
// post user POST /api/user gets JSON bodies
router.post('/register', urlencodedParser, auth.verifyToken, userController.storeUser); // only role = 1 can access (admin)
// update user
router.put('/:user_id', urlencodedParser, auth.verifyToken, userController.updateUser); // only role = 1 can access (admin)
// delete user
router.delete('/:user_id/destroy', urlencodedParser, auth.verifyToken, userController.destroyUser); // only role = 1 can access (admin)

// search user by title
router.post('/search/:username', urlencodedParser, userController.searchUser);

// login 
router.post('/login', urlencodedParser, userController.loginUser);

module.exports = router;
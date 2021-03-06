const 	express = require('express'),
	router = express.Router(),
	UserController = require('../controllers/userController.js'),
	Middleware = require('../middlewares/index.js');

/* GET users listing. */
router.post('/login', UserController.login);
router.post('/signup', UserController.create);
router.put('/', Middleware.authentication, UserController.update);
router.delete('/', Middleware.authentication, UserController.delete);
router.post('/gSignIn', UserController.gSignIn );
router.post('/fSignIn', UserController.fSignIn );


module.exports = router;

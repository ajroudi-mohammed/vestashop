

const router = require('express').Router();
//const UsersController = require('../controllers/UsersController');


/*router.use('/', () => {
	router.get('/', function(req, res) {
  		res.render('pages/index');
	});
});*/

router.use('/api/v1', require('./api'));


module.exports = router;

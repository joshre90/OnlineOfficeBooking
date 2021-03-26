const controller = require('../controllers/authcompany.controller');

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
			'Access-Control-Allow-Origin : *'
		);
		next();
	});

	app.post('/api/auth/signup', controller.signupcompany);

	app.post('/api/auth/signin', controller.logincompany);

	app.get('/confirmation/:email/:token', controller.confirmEmail);
	//
};

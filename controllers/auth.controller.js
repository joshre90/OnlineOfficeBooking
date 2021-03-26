//this code is based and taken from
//https://slgupta022.medium.com/email-verification-using-sendgrid-in-node-js-express-js-mongodb-c5803f643e09

const db = require('../models');
const sgMail = require('@sendgrid/mail');

//Setting the API_KEY fro sendgrind service via enviroment variables
require('dotenv').config();
sgMail.setApiKey(process.env.API_KEY);

//DB models used in this controller
const User = db.user;
const Company = db.company;
const Token = db.token;

//Extra tools that help to add layer of security in the functions
var bcrypt = require('bcrypt');
var crypto = require('crypto');

//LOGIN FOR COMPANIES
exports.logincompany = (req, res, next) => {
	Company.findOne({ email: req.body.email }, (err, company) => {
		// error occur
		if (err) {
			return res.status(500).send({ msg: err.message });
		}
		// user is not found in database i.e. user is not registered yet.
		else if (!company) {
			return res.status(401).send({
				msg:
					'The email address ' +
					req.body.email +
					' is not associated with any account. please check and try again!',
			});
		}
		// compare user's password if user is found in above step
		else if (!bcrypt.compareSync(req.body.password, company.password)) {
			return res.status(401).send({ msg: 'Wrong Password!' });
		}
		// check user is verified or not
		else if (!company.isVerified) {
			return res.status(401).send({
				msg:
					'Your Email has not been verified. Please verify the account first',
			});
		}
		// user successfully logged in
		else {
			return res.status(200).send('User successfully logged in');
		}
	});
};

//SIGNUP FOR COMPANIES
exports.signupcompany = (req, res, next) => {
	Company.findOne({ email: req.body.email }, (err, company) => {
		// error occur
		if (err) {
			return res.status(500).send({ msg: err.message });
		}
		// if email does exist into database i.e. email is associated with another user.
		else if (company) {
			return res.status(400).send({
				msg: 'This email address is already associated with another account.',
			});
		}
		// if user does not exist into database then save the user into database to register account
		else {
			// password hashing for save into databse
			req.body.password = bcrypt.hashSync(req.body.password, 10);
			// create and save company
			company = new Company({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
			company.save(function (err) {
				if (err) {
					return res.status(500).send({ msg: err.message });
				}

				// generate token and save
				var token = new Token({
					_companyId: company._id,
					token: crypto.randomBytes(16).toString('hex'),
				});
				console.log(token);
				token.save(function (err) {
					if (err) {
						return res.status(500).send({ msg: err.message });
					}

					//Sengrid new method
					const message = {
						from: 'joshua.re90@gmail.com',
						to: company.email,
						subject: 'Account Verification Link',
						text:
							'Hello ' +
							req.body.name +
							',\n\n' +
							'Please verify your account by clicking the link: \nhttp://' +
							req.headers.host +
							'/confirmation/' +
							company.email +
							'/' +
							token.token +
							'\n\nThank You!\n',
					};

					sgMail.send(message, (err) => {
						if (err) {
							return res.status(500).send({
								msg:
									'Technical Issue!, Please click on resend for verify your Email.',
							});
						}
						return res
							.status(200)
							.send(
								'A verification email has been sent to ' +
									company.email +
									'. It will be expire after one day. If you not get verification Email, click on resend token.'
							);
					});
				});
			});
		}
	});
};

//CONFIRMING TOKEN
exports.confirmEmail = (req, res, next) => {
	Token.findOne({ token: req.params.token }, (err, token) => {
		// token is not found into database i.e. token may have expired
		if (!token) {
			return res.status(400).send({
				msg:
					'Your verification link may have expired. Please click on resend for verify your Email.',
			});
		}
		// if token is found then check valid user
		else {
			Company.findOne(
				{ _id: token._companyId, email: req.params.email },
				(err, company) => {
					// not valid user
					if (!company) {
						return res.status(401).send({
							msg:
								'We were unable to find a user for this verification. Please SignUp!',
						});
					}
					// user is already verified
					else if (company.isVerified) {
						return res
							.status(200)
							.send('User has been already verified. Please Login');
					}
					// verify user
					else {
						// change isVerified to true
						company.isVerified = true;
						company.save((err) => {
							// error occur
							if (err) {
								return res.status(500).send({ msg: err.message });
							}
							// account successfully verified
							else {
								return res
									.status(200)
									.send('Your account has been successfully verified');
							}
						});
					}
				}
			);
		}
	});
};

const mongoose = require('mongoose');

const Company = mongoose.model(
	'Company',
	new mongoose.Schema({
		//Phone: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isVerified: { type: Boolean, default: false },
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Role',
			},
		],
	})
);

module.exports = Company;

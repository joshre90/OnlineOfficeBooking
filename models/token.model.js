const mongoose = require('mongoose');

const Token = mongoose.model(
	'Token',
	new mongoose.Schema({
		_companyId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Company',
		},
		token: { type: String, required: true },
		expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
	})
);

module.exports = Token;

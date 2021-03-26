const mongoose = require('mongoose');

const CompanyDetails = mongoose.model(
	'Company',
	new mongoose.Schema({
		id_company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
		},
		name: { type: String, required: true },
		building_name: { type: String, required: true },
		address: { type: String, required: true },
		opening_time: { type: Date, required: true },
		closing_time: { type: Date, required: true },
		information: { type: String },
	})
);

module.exports = CompanyDetails;

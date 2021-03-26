const mongoose = require('mongoose');

const Booking = mongoose.model(
	'Booking',
	new mongoose.Schema({
		Comments: { type: String, required: true },
		Date: { type: Date, required: true },
		Start_time: { type: Date, required: true },
		End_time: { type: Date, required: true },
		id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		id_room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
		id_building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
	})
);

module.exports = Booking;

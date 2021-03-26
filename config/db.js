const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
require('dotenv').config();
//require('dotenv').config();
//const env = process.env.MONGO_URL.toString();

const connectDB = async () => {
	//console.log('Connection url => ', process.env.MONGO_URL);
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.log(process.env.DB_NAME);
		console.log(process.env.DB_PASS);
		console.log(process.env.MONGO_URL);
		console.log('Connection error');
		console.log(err.message);
		//Exit process qwith faliure
		process.exit(1);
	}
};

module.exports = connectDB;

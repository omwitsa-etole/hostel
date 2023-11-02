const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({ 
	key: mongoose.ObjectId,
	firstname: String,
	lastname : String,
	email: String,
	age: { type: Number, min: 18, max: 65 },
	password:String
});

const hostelSchema = new mongoose.Schema({
	user:userSchema,
	key: mongoose.ObjectId,
	name:String,
	price: Number,
	date: Date,
})





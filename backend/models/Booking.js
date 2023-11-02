const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
	
	hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hostel'
    },
	saved:{
		type:Boolean,
		default:false,
	},
	complete:{
		type:Boolean,
		default: false,
	},
	checkin:{
		type:Date,
		default: Date.now(),
	},
	checkout:{
		type:Date,
		default: Date.now(),
	},
	
    date: {
        type: Date,
        default: Date.now(),
    }
	
});

module.exports = mongoose.model('booking', BookingSchema);
const Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true, 
	},
	password: {
		type: String,
		required: true, 
	},	
	dob: {
		type: String,
		required: true, 
	},	
	gender: {
			type: String,
			required: true, 
		},	
},{
	collection: 'usersdetails'
});
module.exports = Mongoose.model('usersdetails',userSchema); 

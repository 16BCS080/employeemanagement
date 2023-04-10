const Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var bookSchema = new Schema({
	name: {
		type: String,
		required: true, 
		unique: true,		
		trim: true,
	},
	author: {
		type: String,
		required: true, 
	},
	desc: {
		type: String,
		required: true, 
	},	
},{
	collection: 'bookdetails'
});
module.exports = Mongoose.model('bookdetails',bookSchema); 

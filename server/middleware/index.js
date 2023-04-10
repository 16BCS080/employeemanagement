const model = require('../models/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = model.user; 

exports.adminuserInfoValidation = async ( req, res, next ) => { 
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader.substring(7, authHeader.length); 
    	const decoded = jwt.verify(token, process.env.SECRET_JWT_CODE); 
    	const userinfo = await user.find( { '_id': decoded.id } ).exec(); 
    	result = userinfo.map((r) => r.toObject());
    	if ( result[0]['role']=="admin" ) {
    		next();
    	}else{
    		res.send({ response: false , msg: "No access to submit form." });
    	}
	} catch(err) {
		console.log(err);
		res.send({ response: false , msg: "server error" });
	}		
}
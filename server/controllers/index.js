const model = require('../models/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = model.user;
const book = model.book;

exports.registerUser = async ( req, res) => { 
	try {
		const { name, email, password, dob, gender } = req.body;
		const psw = await bcrypt.hash(password, 10);
		const data = { name: name, email: email,password: psw, dob: dob, gender: gender};  
		user.collection.insertOne(data);
		res.send({
			msg: "success"
		});
	} catch(err) {
		console.log(err);
	}		
}

exports.userInfo = async ( req, res) => { 
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader.substring(7, authHeader.length); 
    	const decoded = jwt.verify(token, process.env.SECRET_JWT_CODE); 
    	res.send( await user.findById( decoded.id ).exec() );
	} catch(err) {
		console.log(err);
	}		
}

exports.addNewbook = async ( req, res) => { 
	try {
		const { name, author, desc } = req.body; 
		const data = { name: name, author: author,desc: desc}; 
		book.collection.insertOne(data);
		const all_books = await book.find().exec();
		console.log( all_books );
		res.send( all_books );
	} catch(err) {
		console.log(err);
	}		
}

exports.getallBook = async ( req, res) => { 
	try {
		const all_books = await book.find().exec(); 
		//console.log( all_books );
		res.send( all_books );
	} catch(err) {
		console.log(err);
	}		
}

exports.loginUser = async ( req, res) => { 
	try {
		const { email, password } = req.body;  
		const data = { email: email };  
		const userinfo = await user.find(data).exec();
      	const authResult = userinfo.length && await bcrypt.compare(password, userinfo[0].password);
      	var response = {};        	
      	console.log(userinfo)    	    	
      	response['type'] = authResult ? 'success' : 'error' ;  
      	if(authResult) {
      		response['name'] = userinfo[0].name;  
      		response['email'] = userinfo[0].email;  
      		const token = jwt.sign({ id: userinfo[0]._id }, process.env.SECRET_JWT_CODE , { expiresIn: '24h' });
    		const decoded = jwt.verify(token, process.env.SECRET_JWT_CODE); 
      		response['userToken'] = token; 
      	} 
      	//console.log(response)
    	//{"_id":"642edf08760d62ddaa61b9a4","firstName":"gfds","email":"elakiyan@gmail.com","userToken":""}

		res.send(response);
	} catch(err) {
		console.log(err);
	}		
}

exports.getallEmployee = async ( req, res) => { 
	try {
		const all_user = await user.find().exec();  
		console.log( all_user )
		res.send( all_user );
	} catch(err) {
		console.log(err);
	}		
}
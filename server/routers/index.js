const controller = require('../controllers/') 
const middleware = require('../middleware/') 
module.exports = ( app ) => { 
	app.post('/api/register/', middleware.adminuserInfoValidation, controller.registerUser );
	app.post('/api/login/', controller.loginUser );	
	app.post('/api/book/new/', controller.addNewbook) ;
	app.post('/api/book/all/', controller.getallBook) ;
	app.post('/api/info/', controller.userInfo) ;

	app.post('/api/allusers/', middleware.adminuserInfoValidation,controller.getallEmployee ); 

}
const express = require('express');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
var cors = require('cors');
dotenv.config();
 
const routers = require('./routers/');
const db = require('./db');
const dbmodel = require('./models/');

const app = express();
const port = process.env.PORT || 3000; 

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());

routers(app);

db.on('error', () => { 
	console.log('connection');
});

db.once('open',  () => { 
	console.log('mongo db connected');
	app.listen(port, () => {console.log(`server started ${port}`);});
});
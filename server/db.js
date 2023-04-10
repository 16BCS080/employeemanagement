const Mongoose = require('mongoose');
//const mongourl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@${process.env.DB_CLUSTER}.mongodb.net`;
const mongourl = `mongodb+srv://L45XPZqwdq11SQst:${process.env.DB_PSW}@sample-db.e7i1p5i.mongodb.net/test`;
const options = {
  useNewUrlParser: true,
};
Mongoose.connect(mongourl,options).then(
  () => { console.log('server success connection'); },
  err => { console.log(err); }
);


module.exports = Mongoose.connection;
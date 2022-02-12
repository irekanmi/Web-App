var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var params = require('./params/params');
var app = express();
const setupPassport = require('./setupPassport');

mongoose.connect(params.DATABASECONNECTION,{
  useUnifiedTopology:true,
  useNewUrlParser:true,
  // useCreateIndex:true,
  // useFindAndModify:false
})
setupPassport();

app.set("port", process.env.PORT || 3000);
app.set('views',path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(cookieParser());
app.use(session({
  secret:'hshfhiohfibvhivhizoh03r9yhie',
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.use('/',require('./routes/web'))
app.use('/api',require('./routes/api'))


app.listen(app.get("port"), function () {
  console.log(`Server is on port ${app.get("port")}...`);
});

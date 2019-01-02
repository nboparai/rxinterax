// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
// const mongoose = require("mongoose");
const dbConnection = require("./server/database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./server/passport");
const app = express();
const PORT = process.env.PORT || 3001;
// Routes | User
const user = require("./server/routes/users");

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Use sessions to keep track of user login status
app.use(session({ 
	secret: "keyboard cat", // Random string to make the hash that is generated secure
	store: new MongoStore({ mongooseConnection: dbConnection }),
	resave: false, 
	saveUninitialized: false,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); // Calls the deserializeUser

// User route
app.use('/user', user);

// Start API server
app.listen(PORT, () => {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("./server/passport");
const app = express();
const PORT = process.env.PORT || 3001;
// Routes
const routes = require("./server/routes");

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
	resave: false, 
	saveUninitialized: false,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); // Calls the deserializeUser

// Routes
app.use(routes);

// Local database url ~ 27017 is the default mongoDB port
const uri = 'mongodb://localhost:27017/rxinterax'
// Connect to Mongo database
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rxinterax", { useNewUrlParser: true });
mongoose.connect(uri, { useNewUrlParser: true });

// Start API server
app.listen(PORT, () => {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

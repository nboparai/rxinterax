require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require('mongoose');
const routes = require("./routes");

// Requiring passport as we've configured it
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware defined
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Use sessions to keep track of user login status
app.use(session({ 
	secret: "keyboard cat", 
	resave: true, 
	saveUninitialized: true,
	cookie: { maxAge: 100 * 60 * 60 * 24 * 30} // = 30 days
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes, both API and view
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rxinterax", { useNewUrlParser: true });

// Start API server
app.listen(PORT, () => {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
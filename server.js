// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const dbConnection = require("./server/database/models");
const MongoStore = require("connect-mongo")(session);
const passport = require("./server/passport");
const app = express();
const PORT = process.env.PORT || 3001;
// Routes
const routes = require("./server/routes");
mongoose.Promise = global.Promise;

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
	// store: new MongoStore({ mongooseConnection: dbConnection }),
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



// Connect to Mongo database
// const mongoose = require("mongoose")
// mongoose.Promise = global.Promise

// Local database url
// 27017 is the default mongoDB port
// const uri = 'mongodb://localhost:27017/rxinterax'

// Connect to Mongo database
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rxinterax", { useNewUrlParser: true });

// mongoose.connect(uri, { useNewUrlParser: true }).then(
//     () => { 
//         /** Ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
//         console.log('Connected to Mongo');
//     },
//     err => {
//          /** handle initial connection error */ 
//          console.log('error connecting to Mongo: ')
//          console.log(err);    
//     }
// );

// module.exports = mongoose.connection
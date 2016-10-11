var express		 				= require("express"),
	app 		 				= express(),
	bodyParser 	 				= require("body-parser"),
	mongoose  	 				= require("mongoose"),
	methodOverride				= require("method-override"),

	passport	 				= require("passport"),
	LocalStrategy				= require("passport-local"),
	passportLocalMongoose		= require("passport-local-mongoose"),
	expressSession				= require("express-session"),
	
	flash						= require("connect-flash");
	
	// LOGIC SCHEMA
var Campgrounds  				= require("./models/campgrounds"),
    Comment 	 				= require("./models/comments"),
    User						= require("./models/user"),
    seedsDB		 				= require("./seeds");
    
    // ROUTES
var campgroundRoute				= require("./routes/campgrounds"),
	commentRoute				= require("./routes/comments"),
	indexRoute					= require("./routes/index");
	
	
// export DATABASEURL=mongodb://localhost/yelp_camp
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//__dirname - return the value of directory name
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedsDB(); // Seed the database

// ================
// PASSPORT CONFIG
// ================
app.use(expressSession({
	secret: "This is the secret string",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware na gamit para sa lahat ng route para mag check ng user.
app.use(function(req, res, next){
	
	// TO REQUEST THE USER
	res.locals.currentUser = req.user;
	
	// TO SHOW THE FLASH MESSAGE
	res.locals.error	= req.flash("error");
	res.locals.success	= req.flash("success");
	
	return next();
});


app.use(indexRoute);
// Start all campgroundRoute with "/campgrounds" on there route
app.use("/campgrounds", campgroundRoute);
// Start all commentRoute with "/campgrounds/comment/:id/" on there route
app.use("/campgrounds/:id/comment", commentRoute);


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server Connected!");
});

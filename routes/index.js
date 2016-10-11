var express         = require("express"),
    router          = express(),
    User            = require("../models/user"),
    passport        = require("passport");
    


// Landing Page
router.get("/", function(req, res){
	res.render("landing");
});

//==============
// AUTH ROUTE
//==============


// Show Register Form
router.get("/register", function(req, res){
	res.render("register");
});

// Handle Register Form
router.post("/register", function(req, res){
	//.register == passport function
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("back");
		}
		// Pag na register ma re redirect sa campgrounds page
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// LOGIN FORM
router.get("/login", function(req, res){
	res.render("login");	
});

// Handling LOGIN LOGIC
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
	req.flash("success", "Welcome Back to YelpCamp " + req.body.username);
});

// LOGOUT LOGIC
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logout Successfully");
	res.redirect("/campgrounds");
});


// Return All router.
module.exports = router;
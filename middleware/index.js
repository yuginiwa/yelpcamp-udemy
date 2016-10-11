var Campgrounds     = require("../models/campgrounds"),
    Comment         = require("../models/comments"),
    middlewareObj   = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	// Check if user is Already Log In
	if(req.isAuthenticated()){
		//Find the ID of Campgrounds
		Campgrounds.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "No Campground Find");
				res.redirect("back");
			}else{
				// Compare if User ID is equal to Post ID
				if(foundCampground.author.id.equals(req.user._id)){
					// Proceed to next step
					next();
				}else{
					// IF NOT Ownership, Redirect Back to previews page
					req.flash("error", "You Don't Have Permission To Do That");
					res.redirect("back");
				}
			}
		});
	}else{
		// Redirect Back to previews page
		req.flash("error", "You Need To Be Logged in first");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	// CHECK IF USER IS LOGGED IN
	if(req.isAuthenticated()){
		// FIND THE COMMENT ID
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "You Need To Logged In First");
				res.redirect("back");
			}else{
				// DO USER OWN THE COMMENT?
				if(foundComment.author.id.equals(req.user._id)){
					// IF YES, PROCEED
					next();
				}else{
					// IF NOT, GO BACK
					req.flash("error", "You Don't Have Permission To Do That");
					res.redirect("back");
				}
			}
		});
	}else{
		// IF THERE IS NO USER REDIRECT BACK
		req.flash("error", "You Need To Logged In First");
		res.redirect("back");
	}
}


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You Need To Be Logged in first");
	res.redirect("/login");
}

module.exports = middlewareObj;
var express         = require("express"),

    //Router({mergeParams: true}) - para ma identify yung :id dun sa URL
    router          = express.Router({mergeParams: true}),
    Campgrounds     = require("../models/campgrounds"),
    Comment         = require("../models/comments"),
    
    middlewareObj	= require("../middleware");
    
    


// =======================
// COMMENT ROUTE
// =======================

// COMMENT FORM
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
	// Get the specific ID
	Campgrounds.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	});
});


// HANDLING CREATE COMMENT 
router.post("/", middlewareObj.isLoggedIn, function(req, res){
	// Create new Comment
	Comment.create(req.body.comment, function(err, comment){
		if(err){
			console.log(err);
		}else{
			// Associate Comment to the Specific Campground
			Campgrounds.findById(req.params.id, function(err, campground){
				if(err){
					console.log(err);
				}else{
				    // Find User Id and Username
				    comment.author.id = req.user.id;
				    comment.author.username = req.user.username;
				    // Save Comment
				    comment.save();
				    //Push the newly created comment
					campground.comments.push(comment);
					campground.save();
					//Redirect back to specific campground page
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

// EDIT COMMENT FORM
// /campgrounds/:id/comment/   :comment_id/edit
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
	// Find the comment ID
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			// Render the comment edit page
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// HANDLING UPDATE COMMENT
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
	// FIND COMMENT ID AND UPDATE
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			// REDIRECT TO SHOW PAGE OF SPECIFIC CAMPGROUND
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY COMMENT
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
	// FIND COMMENT ID AND REMOVE
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});




// Return All router.
module.exports = router;
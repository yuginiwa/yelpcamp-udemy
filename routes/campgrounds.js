var express     	= require("express"),
    router      	= express(),
    Campgrounds 	= require("../models/campgrounds"),
    middlewareObj	= require("../middleware");
    

//==============
// CAMPGROUNDS ROUTES
//==============

// INDEX : List of campgrounds
router.get("/", function(req, res){
	//Retreiving all data from DB
	Campgrounds.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			req.flash("success");
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// NEW: Form for adding new campgrounds
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// CREATE : Process to add new campgrounds
router.post("/", middlewareObj.isLoggedIn, function(req, res){
	//Get data to the form and Add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user.id,
		username: req.user.username
	};
	var newCapmground = {name: name, image: image, description: description, author: author};
	
	//Adding data to database
	Campgrounds.create(newCapmground, function(err, newCapmground){
		if(err){
			console.log(err);
		}else{
			//Redirect back to campgrounds page
			req.flash("success", newCapmground.name + " added successfully");
			res.redirect("/campgrounds");
		}
	});
});

// SHOW: Page to show specific campground
router.get("/:id", function(req, res){
	//Get the specific ID from DB
	//Mongoose function to find the ID
	//Get the Comments ID and Embedded it to the Campgrounds
	Campgrounds.findById(req.params.id).populate("comments").exec(function(err, theCampgroundID){
		if(err){
			console.log(err);
		}else{
			//Render the page for specific ID
			res.render("campgrounds/show", {campground: theCampgroundID});
		}
	});
});

// SHOW EDIT FORM
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
	//Find the ID of Campgrounds
	Campgrounds.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});	
	});
});

// HANDLING UPDATE LOGIC
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	// Find Id and Update the correct campground
	Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			// Redirect to somewhere
			req.flash("success", updatedCampground.name + " updated!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campgrounds.findByIdAndRemove(req.params.id, function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success", foundCampground.name + " deleted");
			res.redirect("/campgrounds");
		}
	});
});





// Return All router.
module.exports = router;
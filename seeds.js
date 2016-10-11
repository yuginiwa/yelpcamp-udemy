var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
	{
		name: "Bridge",
		image: "https://static.tripzilla.com/thumb/e/8/28392_620x.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Dessert",
		image: "https://static.tripzilla.com/thumb/e/9/28393_620x.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Lawa",
		image: "https://static.tripzilla.com/thumb/e/a/28394_620x.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
]

function seedDB(){
	//Remove All Existing Campground
	// Campground.remove({}, function(err){
		// if(err){
		// 	console.log(err);
		// }
		// console.log("Remove All Campground");

		// // Loop through array and Save the Data to DB
		// data.forEach(function(seed){
		// 	Campground.create(seed, function(err, campground){
		// 		if(err){
		// 			console.log(err);
		// 		}else{
		// 			console.log("Created!");
		// 			 // Create a Comment toEach Campground
		// 			Comment.create(
		// 				{
		// 					text: "Pare-parehas na Comments!!!!",
		// 					author: "GLoco"
		// 				}, 
		// 				function(err, comment){
		// 					if(err){
		// 						console.log(err);
		// 					}else{
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("Created!");
		// 					}
		// 				});
		// 		}
		// 	});
		// });
	// });
}

module.exports = seedDB;
var cradle = require('cradle');
var db = new(cradle.Connection)('127.0.0.1', 5984, {cache: false}).database('escatracker')
, request   = require('superagent');


exports.index = function(req, response){
	var jsRep = new Array();
	var i=0;
	var issues = [];

	request.get("/issues", function(res, error){
		issues = res;
		console.log("this worked");
		
	});
};
exports.issues = function(req,response){
 	if(req.accepts('json')=='json'){
 		var jsRep = new Array();
		var i=0;
		db.view('issues/unresolvedIssues', function(err, res)
		{
			if(err)
				{console.log(err);}
			console.log(res);
			res.forEach(function(row){
				jsRep[i]=
					{
						issue: row.Title,
						escto: row.Subject,
						prev:  row.Previous,
						next:  row.Next,
						id  :  row._id,
						revid: row._rev
					};
				i++;
			});
			return response.json(jsRep);
			
		});
 	};
};


// exports.register = function(req, res){
//   res.render('register', { 
//       "title"  : "Register",
//       "errors" : "" 
//   });
// };

// exports.users = function(req, res){
//   return res.json({
//     user : req.session
//   });
// };

// exports.chats = function(req, res){
 
//   if (req.session.authed) {

//     var username = req.session.user;
//     var users = req.params.users.split("-and-");

//     if (!req.params.users.match(/username/g)) res.redirect("/");

//     return db.get(username, function (err, doc) {
//       return res.render('index', { 
//         title : 'EMessage',
//         user  : doc
//       });
//     });
    
//   }; 

//   res.redirect("/sign-in");
  
// };

// exports.sign_in = function(req, res){

//   if (req.query["register"]) return res.render('sign-in', { 
//     title: 'Sign In', 
//     register : "You've successfully registered!" 
//   });  

//   res.render('sign-in', { title: 'Sign In', register : "" });
  
// };

// exports.logout = function(req, res){
//   req.session.authed=false;
//   res.redirect("/sign-in");  
// };

// exports.profileManagement = function(req, res){
//   if(!req.session.authed) return res.redirect("/sign-in");
//   var username = req.session.user;
//   return db.get(username, function (err, doc) {
//     return res.render('account', {
//       title : 'EMessage',
//       user : doc

//     });
//   });
// };
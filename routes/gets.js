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


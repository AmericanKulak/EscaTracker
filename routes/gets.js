var cradle = require('cradle');
var db = new(cradle.Connection)('127.0.0.1', 5984, {cache: false}).database('escatracker')
, request   = require('superagent');

var sortDate= function(a,b){
	return Date.parse(a.next)>Date.parse(b.next);
}

exports.issues = function(req, response){
	if(req.accepts('text/html')=='text/html'){
		request.get("http://127.0.0.1:8002/unresolvedIssues", function(error, res){
			if(error){return console.log(error);}
			return response.render('index', { 
		        title : 'EscaTracker',
		        tableContents  : res.body.sort(sortDate)
	      	});
		});
	}
	else if(req.accepts('json')=='json'){
		request.get("http://127.0.0.1:8002/unresolvedIssues", function(error, res){
			if(error){return console.log(error);}
			return response.json(res.body);
	      	
		});
	}
};
exports.unresolvedIssues = function(req,response){
 	if(req.accepts('json')=='json'){
 		var jsRep = new Array();
		var i=0;
		db.view('issues/unresolvedIssues', function(err, res)
		{
			if(err)
				{console.log(err);}
			res.forEach(function(row){
				jsRep[i]=
					{
						issue: row.title,
						escto: row.subject,
						prev:  row.previous,
						next:  row.next,
						id  :  row._id,
						revid: row._rev
					};
				i++;
			});
			return response.json(jsRep);
		});
 	};
};


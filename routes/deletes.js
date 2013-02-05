var cradle = require('cradle')
  , db = new(cradle.Connection)('127.0.0.1', 5984, {cache: false}).database('escatracker');

  exports.issues = function(req, res){
  	if(req.body.issue && req.params.id==req.body.issue._id){
	    db.save(req.body.issue, function(err, doc){
	      if(err){console.log(err);}
	      return res.json({status: true });
	      });
	}
	else {return res.json({status:false});}
  };
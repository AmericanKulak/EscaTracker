var cradle = require('cradle')
  , db = new(cradle.Connection)('127.0.0.1', 5984, {cache: false}).database('escatracker')

  exports.create = function(req, res){
    console.log(req.body.issue);
    db.save(req.body.issue, function(err, doc){
      if(err){console.log(err);}
      return res.json({status: true });
      });
    
  };


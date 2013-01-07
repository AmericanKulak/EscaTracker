var cradle = require('cradle')
  , db = new(cradle.Connection)('127.0.0.1', 5984, {cache: false}).database('escatracker')

  exports.create = function(req, res){
    console.log(req.body.issue);
    db.save(req.body.issue, function(err, doc){
      if(err){console.log(err);}
      });
    return res.json({status: true });
  };

// exports.register = function(req, res){

//   var errors = [];

//   if (req.body.email == "") errors.push("Email was empty!");
//   if (req.body.password == "") errors.push("Password was empty!");
//   if (!req.body.email.match(/etsms.com/g)) errors.push("Email was not etsms related!");

//   try {
//     check(req.body.email).len(6, 64).isEmail();
//   } catch (e) {
//     errors.push("Email provided was not long enough or did not appear to be a valid email.");
//   }

//   try {
//     check(req.body.password).len(6, 64);
//   } catch (e) {
//     errors.push("Password provided was not long enough.");
//   }


//   db.get(req.body.email, function (err, doc) {
//     if (doc) return errors.push("User already exists!");
//   });


//   if (errors.length) return res.render("register", {  
//     "title"  : "Register",
//     "status" : false,
//     "errors" : errors
//   }); 

//   //above code checks for errors (empty inputs, invalid inputs, existing user) and sends a response to render with any errors if there is an error

//   //return bcrypt.genSalt(10, function(err, salt) { //1st, I am 90% certain that the 'salt' reference only works because salt is a property of bcrypt... 2nd, salt generation is not inbuilt into node's crypto module, and thus this function will be reduced 
   
//     var hasher=crypto.createHash('sha1'); //a better hash type may be required, I honestly don't know enough.  //bcrypt.hash(req.body.password, salt, function(err, hash) {
//     hasher.update(req.body.password);
//     var d= hasher.digest('hex');
//     var data = {
//       "password"   : d,
//       "first_time" : true,
//       "username"   : "John Doe",
//       "avatar"     : "/images/avatar.jpg"
//     };

//     return db.save(req.body.email, data, function(err, doc){

//       if (err) return res.render("register", { 
//         "title"  : "Register",
//         "status" : false,
//         "errors" : err 
//       });

//       res.redirect("/sign-in?register=true");

//     });


// };

// exports.users = function(req, res){
//   //add username duplicate checker
//    var errors = [];
//   db.view('usernames/byUsername', {key: req.body.username}, function(err,rowsArray){
//     rowsArray.forEach(function (row) {
//       console.log("%s exists!", row.username);
//       errors.push("Username exists already!");
//       /**if(errors.length) return res.render("replaceThisText", {
//         "title" : "replaceThisText",
//         "status" : false,
//         "errors" : errors
//       });**/
//     });
//     if (req.body.username && req.body.avatar) return db.merge(req.session.user, { 
//         "first_time" : false, 
//         "username"   : req.body.username,
//         "avatar"     : req.body.avatar
//       }, function(err, doc){

//       if (err) return console.error(err);

//       return res.json({
//         "username" : doc.username,
//         "avatar"   : doc.avatar,
//         "status"   : true
//       });
//     });
//   });
// };

// exports.sign_in = function(req, res){

//   var errors = [];

//   try {
//     check(req.body.email).len(6, 64).isEmail();
//   } catch (e) {
//     errors.push("Email provided was not long enough or did not appear to be a valid email.");
//   }

//   try {
//     check(req.body.password).len(6, 64);
//   } catch (e) {
//     errors.push("Password provided was not long enough to be a valid email.");
//   }

//   db.get(req.body.email, function (err, doc) {
    
//     if (err) errors.push("Could not find that email. Try again!");

//     if (errors.length) return res.render("sign-in", {  
//       "title"    : "Sign In",
//       "status"   : false,
//       "errors"   : errors,
//       "register" : "There was a sign in error."
//     });

//     //pw validation
//     var hasher=crypto.createHash('sha1');
//     hasher.update(req.body.password);
//     var d = hasher.digest('hex');

//     if(d!=doc.password) errors.push("Password mismatch.");

//     if (err) errors.push(err);

//     if (errors.length) return res.render("sign-in", {  
//       "title"    : "Sign In",
//       "status"   : false,
//       "errors"   : errors,
//       "register" : "Authentication error, try again."
//     });

//     req.session.authed = true;
//     req.session.user   = req.body.email;

//     return res.redirect("/");
//   });

// };

// exports.updateUserInfo = function(req, res) {
//   if(!req.session.authed) return res.redirect("/");
//   if (req.body.username && req.body.avatar) return db.merge(req.session.user, {  
//           "username"   : req.body.username,
//           "avatar"     : req.body.avatar
//         }, function(err, doc){

//         if (err) return console.error(err);

//       return res.json({
//         "username" : doc.username,
//         "avatar"   : doc.avatar,
//         "status"   : true
//       });
//   });
//   if (req.body.username) return db.merge(req.session.user, {  
//           "username"   : req.body.username
//         }, function(err, doc){

//         if (err) return console.error(err);

//       return res.json({
//         "username" : doc.username,
//         "avatar"   : doc.avatar,
//         "status"   : true
//       });
//   });
//   if (req.body.avatar) return db.merge(req.session.user, {  
//           "avatar"     : req.body.avatar
//         }, function(err, doc){

//         if (err) return console.error(err);

//       return res.json({
//         "username" : doc.username,
//         "avatar"   : doc.avatar,
//         "status"   : true
//       });
//   });
//     return res.redirect("/");
// };



/**
 * Module dependencies.
 */

var express = require('express')
  , gets    = require('./routes/gets')
  , posts   = require('./routes/posts')
  , puts    = require('./routes/puts')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , server  = http.createServer(app)
  

console.log("Loading configs!");
app.configure(function(){
  app.set('port', process.env.PORT || 8002);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

console.log("Loading Dev Error Logger");
app.configure('development', function(){
  app.use(express.errorHandler());
});

console.log("Loading gets!");
app.get('/', gets.index);
app.get('/issues', gets.issues);

console.log("Loading posts!");
app.post('/create', posts.create);

console.log("Loading puts!");
app.put('/update', puts.update);

console.log("Ready to Go!");
server.listen(app.get('port'));

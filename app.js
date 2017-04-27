//----------------------------------------------------------------------------------------------------
// includes
//----------------------------------------------------------------------------------------------------
var express = require('express');
var language = require('./config/language/de-DE.json');
var config = require('./config/config.json');
var btoa = require('btoa');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var requestJson = require('request-json');
var client = requestJson.newClient(config.app.api.url +'1/', {rejectUnauthorized: false});
var bodyParser = require('body-parser');
var path = require('path');

// routes
var orders= require('./routes/orders');

//----------------------------------------------------------------------------------------------------
// instantiates Express and assign app variable to it
//----------------------------------------------------------------------------------------------------
// instantiates Express
var app = express();

console.log("PB-Fronted started...");

// configure passport
passport.use(new LocalStrategy( {
    usernameField: 'login-username',
    passwordField: 'login-password'
  },
  function(username, password, done)
  {
  client.headers['Authorization'] = 'Basic ' + btoa(username + ":" + password);
  client.get (
    'login', function (err, resLogin, login)
    {
    if (err)
      return done (err);

    if (login.err && login.err !== "")
      return done (null, false, {message: login.err});

    client.get(
      'groups', function (err, resGroups, groups)
      {
      if(err)
        return done(err);
      if(groups.err)
        return done(groups.err);

      return done (null, { group: login.data.group, groups: groups.data, Authorization: client.headers.Authorization, name: username});
      });
    });
  }
));

function authenticated(req, res, next)
  {
  if (req.isAuthenticated ())
    {
    next ();
    }
  else
    {
    res.redirect ("/login");
    }
  }

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'jade');

// add routes
app.use(express.static(path.join(__dirname, "public")));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// define port
app.listen(config.app.port);

// GET login page
app.get('/', function(req, res)
{
// render login pages
res.render ('login', {config: config, language: language, err: ""});
});

app.get('/login', function(req, res)
{
// render login page
res.render ('login', {config: config, language: language, err: ""});
});

app.get('/logout', function(req, res)
{
req.logout();
res.redirect('/');
});


app.post('/login', function(req, res, next)
{
passport.authenticate (
  'local', function (err, reply, info)
  {
  if (err)
    return next (err);
  if (!reply)
    return res.render ('login', {config: config, language: language, err: language.AUTH_FAILED});

  if (!reply.hasOwnProperty("groups") || reply.groups.length < 1)
    return res.render ('login', {config: config, language: language, err: language.ERROR_SERVERGROUP});

  req.logIn (
    reply, function (err)
    {
    if (err)
      return next (err);

    res.redirect('/orders/view');
    });
  }) (req, res, next);
});


// include simstat resources
app.use('/orders', authenticated, orders);


// catch 404 and forwarding to error handler
app.use(function(req, res, next)
        {
        var err = new Error (language.FILE_NOT_FOUND);
        err.status = 404;
        next (err);
        });

// error handler
app.use(function(err, req, res, next)
        {
        res.status (err.status || 500);
        res.render (
          'error', {
            message: err.message,
            error: {},
            language: language
          });
        });
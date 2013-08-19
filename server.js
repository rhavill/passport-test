var express = require('express');
var app = express();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'SECRET' }));
// app.use(passport.initialize());
// app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, {id:1, username:'admin', password:'password'});
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //});
    if (username == 'admin' && password == 'password') {
      var user = {id: 1, username: 'admin', password: 'password'};
      return done(null, user);
    }
    else return done(null, false, { message: 'Incorrect username or password.' });
  }
));

app.get('/hello.txt', function(req, res){
  res.send('Hello World.');
});
app.get('/private.txt', function(req, res){
  res.send('This page requires a login.');
});
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    res.redirect('/private.txt');
});

app.listen(3000);
console.log('Listening on port 3000');
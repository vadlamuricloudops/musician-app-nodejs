var bodyParser=require('body-parser');
module.exports=function(app){
/* MONGOOSE SETUP */
const mongoose = require('mongoose');
mongoose.connect('mongodb://username:password@databaseserver:port/databasename',{ useNewUrlParser: true});
/*Replace the above connection string with the actual connection string of your MongoDB database*/
const Schema = mongoose.Schema;
const UserDetail = new Schema({
      username: String,
      password: String
    });
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');
/*  PASSPORT SETUP  START*/
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.get('/success', (req, res) => res.render('index',{username:req.query.username,title:'Home'}));
app.get('/error', (req, res) => res.render('login',{username:'',title:'Login',errormessage:'An error occured while logging in. Please check your username and password!'}));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});
/* PASSPORT SETUP STOP */
    app.post('/', 
    passport.authenticate('local', { failureRedirect: '/error' }),
    function(req, res) {        
        res.redirect('/home',{username:req.user.username});
  });
/* PASSPORT LOCAL AUTHENTICATION */
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({
        username: username 
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }
        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }
));
app.get('/',function(req, res) {
    res.render('index', { username : '' , title:'Home'});
  });
  app.get('/index',function(req, res) {
    res.render('index', { username : '' , title:'Home'});
  });
  // Go to login page
app.get('/login',function(req, res) {
    res.render('login',{username : '' ,title: 'Login',errormessage:''});
}); 
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
  });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
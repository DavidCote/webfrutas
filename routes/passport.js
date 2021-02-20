const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usuario');

passport.use(new LocalStrategy({usernameField:'nombre'},
async (nombre, password, done) =>{
  const user = await User.findOne({nombre: nombre});
  if (!user) {
    return done(null, false);
  }else {
    const match = await user.matchPassword(password);
    if(match){
      return done(null,user);
    }else{
      return done(null,false);
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) =>{
    done(err, user);
  });
});

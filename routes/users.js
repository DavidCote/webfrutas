var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/usuario');
const passport = require('passport');


router.get('/signin', (req, res, ) => {
  res.render('user/signin');
});

router.post('/signin', passport.authenticate('local', {failureRedirect:'/users/signin',}), (req, res) =>{
    res.redirect('/tienda');
});

router.get('/signup', (req, res, ) => {
  res.render('user/signup');
});

router.post('/signup', async (req, res) => {
  const {nombre, correo, password} = req.body;
  const nuser = new User({nombre, correo, password});
  nuser.password = await nuser.encryptPassword(password);
  await nuser.save(function(err,data){
    if (err) {
      res.send('error');
    }else {
      res.redirect('/users/signin');
    }
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

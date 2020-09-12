var express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
/* GET users listing. */
router.get('/login', function (req, res) {
  res.render('user/login', {
    invalidPasswords: req.flash('error')
  });
});

router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/register', function (req, res) {
  res.render('user/register', {
    invalidPasswords: req.flash('error')
  });
});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/register',
  failureFlash: true
}));

router.get('/profile', (req, res) => {
  res.render('user/profile', {
    success: req.flash('success')
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/users/login');
});

module.exports = router;
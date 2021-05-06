var express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const auth = require('../config/passport-setup').isAuth;
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/login', function (req, res) {
  res.render('user/login', {
    invalidPasswords: req.flash('error')
  });
});

router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  }))

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

router.get('/profile', auth, (req, res) => { //auth as a middleware, if auth next to user/profile
  res.render('user/profile', {
    success: req.flash('success')
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/users/login');
});

router.post('/uploadImage', upload.single('image'), (req, res) => {
  User.updateOne({ _id: req.user._id }, {
    image: req.file.filename
  }, (err, data) => {
    if (err) {
      req.flash('error', 'Can not upload image, try again please !')
      res.render('user/profile', {
        errors: req.flash('error')
      })
    } else {
      res.redirect('/users/profile');
    }
  })
});

module.exports = router;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// saving user object in the session using id
passport.serializeUser(function (user, done) {
    return done(null, user.id);
});
// back to me who is has the id
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});

passport.use('local.register', new localStrategy({
    usernameField: 'username', //optinal while using username not email
    passwordField: 'password',
    passReqToCallback: true // to get data from the form
}, (req, username, password, done) => { // (req, username, password, done) interface
    if (req.body.password != req.body.retype_password) {
        return done(null, false, req.flash('error', 'passwords do not matched !'));
    } else {
        User.findOne({ username: req.body.username }, (err, data) => {
            if (err) {
                return done(err);
            }
            if (data != null) {
                return done(null, false, req.flash('error', 'username is already registered !'));
            } else {
                let newUser = new User();
                newUser.username = req.body.username;
                newUser.password = newUser.hashPassword(req.body.password);
                newUser.image = "profile.png";
                newUser.save((err, data) => {
                    if (err) {
                        return done(null, false, req.flash('error', 'Failed to register !'));
                    } else {
                        return done(null, data, req.flash('success', 'User Register Successfully'));
                    }
                })
            }
        });
    }
}));


// login strategy

passport.use('local.login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // to get data from the form
}, (req, username, password, done) => { // (req, username, password, done) interface
    User.findOne({ username: username }, (err, user) => {
        console.log('login');
        if (err) {
            return done(err, false, req.flash('error', 'Something went error !'));
        } else {
            if (user == null) {
                return done(null, false, req.flash('error', 'Username is not existed !'));
            } else {
                if (user.comparePassword(password, user.password)) {
                    return done(null, user, req.flash('success', 'Welcome Back !'))
                } else {
                    return done(null, false, req.flash('error', 'Password is not correct !'))
                }
            }
        }
    })
}));

exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}
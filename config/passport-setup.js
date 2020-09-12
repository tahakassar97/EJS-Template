const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/User');

// saving user object in the session
passport.serializeUser(function (user, done) {
    console.log(user);
    console.log('sssssssssssss');
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    console.log(user);
    console.log('aaaaaaaaaaaaaaaaaa');
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // to get data from the form
}, (req, username, password, done) => { // (req, username, password, done) interface
    if (req.body.password != req.body.retype_password) {
        console.log(111);
        return done(null, false, req.flash('error', 'passwords do not matched !'));
    } else {
        User.findOne({ username: req.body.username }, (err, data) => {
            if (err) {
                console.log(222);
                return done(err);
            }
            if (data != null) {
                console.log(333);
                return done(null, false, req.flash('error', 'username is already registered !'));
            } else {
                console.log(444);
                let newUser = new User();
                newUser.username = req.body.username;
                newUser.password = newUser.hashPassword(req.body.password);
                newUser.save((err, data) => {
                    if (err) {
                        console.log(555);
                        return done(null, false, req.flash('error', 'Failed to register !'));
                    } else {
                        console.log(666);
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
    User.findOne({ username: username }, (err, data) => {
        if (err) {
            return done(null, false, req.flash('error', 'Something went error !'));
        } else {
            if (data == null) {
                return done(null, false, req.flash('error', 'Username is not existed !'));
            } else {
                if (data.comparePassword(password, data.password)) {
                    return done(null, data, req.flash('success', 'Welcome Back !'))
                } else {
                    return done(null, false, req.flash('error', 'Password is not correct !'))
                }
            }
        }
    })
}));
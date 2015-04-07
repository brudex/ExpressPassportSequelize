var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.find(id).then(function(user) {
        done(null, user);
    });
});

passport.use(new LocalStrategy(function(email, password, done) {
    db.User.find({
            where: {
                email: email
            }
        })
        .then(function(user) {
             
            if (!user) {
                return done(null, false, {
                    message: 'Invalid email or password. '
                });
            }
            user.comparePassword(password, function(err, isMatch) {

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid email or password'
                    });
                }
            });
        });
}));

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}


// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins
exports.ensureAdmin = function ensureAdmin(req, res, next) {
    console.log(req.user);
    if (req.user && req.user.admin === true)
        next();
    else
        res.send(403);
}
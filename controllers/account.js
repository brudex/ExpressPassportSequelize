var passport = require('passport');
var db = require('../models');


exports.login = function(req, res) {
    var messages=null;
    if(req.session.messages!=null){
        messages=req.session.messages;

    }
  res.render('login', {
    title: 'Login',
      errors:messages

  });
}



/**
 * Show sign up form
 */
exports.signup = function(req, res) {
  res.render('signup', {
    title: 'Sign up',
      errors:null

  });
}

/**
 * Logout
 */

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
}

/**
 * Login Posted
 */
exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.session.messages = [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err,user) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};



/**
 * Create user
 */
exports.create = function(req, res) {
  console.log("Request body :"+JSON.stringify(req.body));
  var newUser = db.User.build(req.body);

    console.log("new User email:"+newUser.email);
    db.User
        .find({where: {
            email: newUser.email
        }})

    .then(function(user) {
          console.log("user :"+user);

      if (!user) {
        newUser.hashPass();
        newUser.save()
        .then(function() {
                req.session.messages=["newsignup"];
                return res.redirect('login');
        })
        .catch(function(err) {
            console.log("catch errors:"+err);
          if (err) return res.render('signup', {
            errors: err.errors,
            user: newUser
          });
        });

      } else {
        return res.render('signup', {
          errors: [
              "The email address you entered is already registered"
          ],
          user: newUser
        })
      }
    });
}

 

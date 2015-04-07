
var account = require('../controllers/account');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', account.signup);
router.post('/signup', account.create);
router.get('/login', account.login);
router.post('/login', account.postlogin);
router.get('/home', account.postlogin);
 

var static = require('../controllers/staticpages');
router.get('/home', static.home);
router.get('/contact', static.contact);
router.get('/faq', static.faq);

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {message: req.flash('loginMessage')});
});
router.get('/signup', function (req, res, next) {
    res.render('signup', {message: req.flash('signupMessage')});
});
router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('profile', {
        user: req.user // get the user out of session and pass to template
    });
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



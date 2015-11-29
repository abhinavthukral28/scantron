/**
 * Created by abhinav on 2015-11-29.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("got here");
    res.render('test');
});

module.exports = router;

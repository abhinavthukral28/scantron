/**
 * Created by allan on 2015-11-28.
 */
var express = require('express');
var router = express.Router();
var Test = require("./../models/Test.js").Test.model;
/* GET home page. */
router.get('/create', function(req, res, next) {
    var testParam = req.body;



    var testObj = new Test({title: testParam.title, questions:testParam.questions });
    testObj.save(function(err){

    });
});

module.exports = router;

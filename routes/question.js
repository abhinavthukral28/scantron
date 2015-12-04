/**
 * Created by allan on 2015-12-03.
 */
var express = require('express');
var router = express.Router();
var Question = require("./../models/Test.js").Question.model;
/* GET home page. */
router.get('/all', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(Question.getAll()));
});

module.exports = router;

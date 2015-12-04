/**
 * Created by allan on 2015-12-03.
 */
var express = require('express');
var router = express.Router();

var Student = require("./../models/Student.js").model;
var newStudent;
Student.get("studentA","123456",function(error,student){
    newStudent = student;
});
/* GET home page. hopefully */
router.get('/', function(req, res, next) {
    console.log("student" + newStudent);
    res.render("test",{student: newStudent});
});

module.exports = router;

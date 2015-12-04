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
    var data = {questions: newStudent.questions}
    console.log(newStudent);
    res.render("test",{data:newStudent.questions});
});

module.exports = router;

/**
 * Created by allan on 2015-12-03.
 */
var express = require('express');
var router = express.Router();

var Student = require("./../models/Student.js").model;
var newStudent;
Student.get("123456",function(error,student){
    newStudent = student;
});
/* GET home page. hopefully */
router.get('/', function(request, res, next) {

    Student.get(request.cookies.username,request.cookies.password,function(error,student){
        var data = {questions: student.questions};
        res.render("test",{data:student.questions});
    });

});

router.get('/update',function(req,res,next){

    var qid = request.body["qid"];
    var index = request.body["responseIndex"];

    Student.get(request.cookies.username,request.cookies.password,function(error,student){
        for(var i = 0; i < student.questions.length; i++)
        {
            if (student.questions[i]._id == qid)
            {
                student.questions[i].studentResponse = index;
            }
        }
    });
    res.statusCode = 200;
    res.end();

});

router.get('/update',function(req,res,next){

     var totalScore;

    Student.get(request.cookies.username,request.cookies.password,function(error,student){
        for(var i = 0; i < student.questions.length; i++)
        {
            if (student.questions[i].responseIndex == student.questions[i].studentResponse)
            {
                total++;
            }
        }
    });
    res.statusCode = 200;
    res.send(total);
    res.end();

});

module.exports = router;

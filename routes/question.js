/**
 * Created by allan on 2015-12-03.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
//var mongoose = ("mongoose")l
var Student = require("./../models/Student.js").model;


/* GET home page. hopefully */
router.get('/', function(request, res, next) {

    Student.get(request.cookies.username,request.cookies.password,function(error,student){
        var data = {questions: student.questions};
        res.render("test",{data:student.questions});
    });

});

router.post('/update',function(request,res,next){
    var qid = request.body["qid"];
    var index =request.body["responseIndex"];
    qid = qid.split("__")[0];
    Student.get(request.cookies.username,request.cookies.password,function(error,student){
        for(var i = 0; i < student.questions.length; i++)
        {

            if (student.questions[i]._id.toHexString() === qid)
            {

                console.log(student.questions[i].studentResponse);
                console.log(student.questions[i].responses);
                student.questions[i].studentResponse = parseInt(index);
                student.markModified('questions');
                student.save(function(err){
                  console.log("sasved");
                }
                );
                //student.questions[i].save(function(err){
                //   console.log("question saved");
                //    student.save(function(err){
                //        console.log("serve");
                //    })
                //});

              //  var question = student.questions[i];



                //student.questions[i].save();
                //student.questions[i].update();
                //student.update();
            }
        }
    });
    res.statusCode = 200;
    res.end();

});

router.get('/submit',function(req,res,next){

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

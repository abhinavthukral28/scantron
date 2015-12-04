/**
 * Created by allan on 2015-11-28.
 */
var mongoose = require("mongoose");
var Question = require("./Test.js").Question.model;

var StudentSchema = new mongoose.Schema({
   username: String,
   studentNumber: String,
    questions:{
        type: [mongoose.Schema.ObjectID],
        ref: 'Question'
    }
});


StudentSchema.statics.get = function(username,studentNumber,callback)
{
    return this.findOne({"username":username, "studentNumber":studentNumber},callback);
};

StudentSchema.methods.addQuestion = function (question)
{
    var contains = false;
    for (var i = 0; i < this.questions; i++)
    {
         if (this.questions[i].id == question.id)
         {
             contains = true;
             break;
         }
    }
    if (!contains)
    {
        this.questions.push(question);
    }

};


module.exports = {
    model:mongoose.model("Student",StudentSchema),schema:StudentSchema
};
/**
 * Created by allan on 2015-11-28.
 */
var mongoose = require("mongoose");

var Question = new mongoose.Schema({
    question: String,
    responses: [String],
    responseIndex:Number
});


var Test = new mongoose.Schema({
   questions:[Question],
    title: String,
    id: {
        type :mongoose.Schema.Types.ObjectId,
        index: true
    }
});

Test.statics.getAll = function(title,callback)
{
    return this.find({title:title},callback);
};


Test.statics.getSingle = function(title,callback)
{
    return this.findOne({title:title},callback);
};


Test.methods.addQuestion = function (question)
{
    this.questions.push(question);
};

module.exports = {
    Test:{model:mongoose.model("Test",Test),schema:Test},
    Question:{model:mongoose.model("Question",Question),schema:Question}
};
/**
 * Created by allan on 2015-11-28.
 */
var mongoose = require("mongoose");
var Test = require("./Test.js").Test;

var StudentSchema = new mongoose.Schema({
   username: String,
   studentNumber: String,
    availableTests:{
        type: [mongoose.Schema.ObjectID],
        ref: 'Test'
    }
});


StudentSchema.statics.get = function(username,studentNumber,callback)
{
    return this.findOne({"username":username, "studentNumber":studentNumber},callback);
};

StudentSchema.methods.addTest = function (test)
{
    var contains = false;
    for (var i = 0; i < this.availableTests;i++)
    {
         if (this.availableTests[i].id == test.id)
         {
             contains = true;
             break;
         }
    }
    if (!contains)
    {
        this.availableTests.push(test);
    }

};


module.exports = {
    model:mongoose.model("Student",StudentSchema),schema:StudentSchema
};
/**
 *
 * Created by abhinav on 2015-12-03.
 */
var mongoose = require("mongoose");
var TestSchemas = require("./models/Test.js");
var Test = TestSchemas.Test.model;
var Question = TestSchemas.Question.model;
var Student = require("./models/Student.js").model;


var questions = [{
    "question": "Which ONE of the following is FALSE about URL’s, IP addresses and Ports?",
    "responses": [
        "Accessing http://localhost:3000 uses the TCP/IP stack",
        "An IP address can serve more than one port number at a time.",
        "A port number need not always be supplied in a URL.",
        "An IP address represents a computer host on the internet.",
        "The URL http://localhost:3000/login.html refers specifically to a sever file named \"login.html\""
    ],
    "responseIndex": 5,
    "studentResponse":0
}, {
    "question": "Which ONE of the following statements about the HTTP protocol is FALSE?",
    "responses": [
        "HTTP can transport content other than HTML.",
        "Both HTTP GET and POST can transport user data.",
        "HTTP must be used on port 3000.",
        "HTTP is stateless (has no notion of previous messages).",
        "Only HTTP GET, not POST, can be cached by the browser."
    ],
    "responseIndex": 3,
    "studentResponse":0
}, {
    "question": "Which ONE of the following is TRUE regarding the difference between a GET and POST HTTP request?",
    "responses": [
        "GET can communicate user query parameters and values but POST cannot.",
        "POST requests are encrypted but GET requests are not.",
        "GET parameters are visible in the browser address bar but POST parameters are not.",
        "GET HTTP requests can be inspected by routers but POST requests cannot.",
        "POST query parameters are limited in length but GET parameters are not."
    ],
    "responseIndex": 3,
    "studentResponse":0

}, {
    "question": "JSON is a popular format for transporting data between client and server. Which ONE of the following statements about JSON is TRUE?",
    "responses": [
        "JSON is more verbose than its competitor XML.",
        "JSON data are objects but XML data are just strings.",
        "An NPM module is required to parse JSON data.",
        "JSON can be transported with a MIME type 'text/plain'.",
        "JSON can be parsed on the server side but not in the browser."
    ],
    "responseIndex": 4,
    "studentResponse":0
}, {
    "question": "Which ONE of the following is FALSE about JSON encoding?",
    "responses": [
        "JSON strings can use single or double quotes to describe property names.",
        "Not all javascript objects can be converted to JSON.",
        "JSON can describe data but not javascript functions.",
        "JSON can use string literals like \"2015/10/17\" to represent dates.",
        "JSON representations are not javascript objects. "
    ],
    "responseIndex": 1,
    "studentResponse":0

}, {
    "question": "Which ONE of the following is officially of type object in Javascript?",
    "responses": [
        "boolean",
        "undefined",
        "string",
        "number",
        "array"
    ],
    "responseIndex": 5,
    "studentResponse":0
}, {
    "question": "Suppose x is a javascript object that does not have a property name defined. Which ONE of the following best describes what happens if you execute the expression x.name = 'Lou'; in Javascript?",
    "responses": [
        "The code does not compile.",
        "The code throws a run-time exception.",
        "The assignment is ignored and nothing about x is changed.",
        "The property name is added to the global object and assigned the value 'Lou'.",
        "The member name is added to the object and assigned the value 'Lou'."
    ],
    "responseIndex": 5,
    "studentResponse":0
}, {
    "question": "Which ONE of the following best explains what the f.prototype property of a function object f refers to in javascript?",
    "responses": [
        "It is the inheritance prototype of object f.",
        "It is the inheritance prototype of an object created as new f().",
        "It is the same object as the one obtained from the expression f.__proto__;",
        "It is not defined when f is used as a constructor with new.",
        "It is undefined because .prototype only applies to non-function objects. "
    ],
    "responseIndex": 3,
    "studentResponse":0
}, {
    "question": "Which ONE of the following statements about strings in javascript is FALSE?",
    "responses": [
        "Character strings in javasript can be tested for equality with the == operator.",
        "It is safe to use a for(ch in myString) to loop over characters of strings.",
        "Strings are considered \"primitives\" in javascript documentation.",
        "Strings are actually objects because they can have object properties assigned to them.",
        "Strings can be represented literally with either single or double quotes in javascript. "
    ],
    "responseIndex": 2,
    "studentResponse":0
}];

var students = [
    {
        "username": "studentA",
        "studentNumber": "123456"
    },
    {
        "username": "studentB",
        "studentNumber": "123456"
    },
    {
        "username": "studentC",
        "studentNumber": "123456"
    },
    {
        "username": "studentD",
        "studentNumber": "123456"
    },
    {
        "username": "studentE",
        "studentNumber": "123456"
    }
];
var dbInit = function(){


    Student.get("studentA","123456",function(err,student)
    {
       if (student === null)
       {


           for (var j = 0; j < students.length; j++) {
               var studentNew = new Student(students[j]);
               for (var i = 0; i < questions.length; i++) {
                   var question = new Question(questions[i]);
                   studentNew.addQuestion(question);
               }
               studentNew.save();
           }
       }
    });

};
module.exports = dbInit;

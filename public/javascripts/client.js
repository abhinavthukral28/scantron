$(document).ready(function()
{

    $('input[type=radio]').click(function(event){
       console.log("click on" + event.target.id);
        console.log("value: " + event.target.value);

        $.ajax({
            url: "/all/update",
            data:{qid: event.target.id,responseIndex: event.target.value},
            type : "POST",
            statusCode: {
                200: function (response) {
                   console.log("updated");
                }
            }

        });
    });
}
);

function submitTest()
{
    $.ajax({
        url: "/all/submit",
        statusCode: {
            200: function (response) {
                window.alert("Final score: " + response);
            }
        }

    });
}
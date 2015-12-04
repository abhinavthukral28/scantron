$(document).ready(function()
{

    $('input[type=radio]').click(function(event){
       console.log("click on" + event.target.id);
        console.log("value: " + event.target.value);

        $.ajax({
            url: "/all/update",
            data:{qid: event.target.id,responseIndex: event.target.value},
            statusCode: {
                200: function (response) {
                   console.log("updated");
                }
            }

        });
    });
}
);
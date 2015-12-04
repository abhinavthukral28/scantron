/**
 * Created by allan on 2015-12-03.
 */
function authenticate()
{
    var username = $("input#email").val();
    var password = $("input#password").val();
    $.ajax({
        url: "/login",
        type: "POST", //send it through get method
        data:{username:username, password: password},
        statusCode: {
            200: function (response) {
               document.location = "/all";
            }
        }

    });
}





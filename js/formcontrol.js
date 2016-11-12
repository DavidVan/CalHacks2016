/**
 * Created by Harold on 11/12/2016.
 */

$(document).ready(function()
{
    $("#submit").on("click", function() {
        testLocation();
    });
});


function getLocation()
{
    return $("#locationInput").val().toString();
}

function testLocation()
{
    console.log(getLocation());
}
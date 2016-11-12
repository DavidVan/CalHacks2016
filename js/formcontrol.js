/**
 * Created by Harold on 11/12/2016.
 */

$(document).ready(function()
{
    $("#submitButton").on("click", function() {
        testLocation();
    });
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
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
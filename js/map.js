var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
    });
}

$(window).resize(function () {
    var height = $(window).height(),
    offsetTop = 50;
    $('#map').css('height', (height - offsetTop));
}).resize();

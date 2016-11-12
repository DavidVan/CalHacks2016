var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

$(window).resize(function () {
    var height = $(window).height(),
    offsetTop = 50;
    $('#map').css('height', (height - offsetTop));
}).resize();

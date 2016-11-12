var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
    });
}

$(window).resize(function () {
    var height = $(window).height(),
    offset = 50;
    $('#map').css('height', (height - offset));
}).resize();

function setLocation(lat, lng) {
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng}
    });
    marker.setMap(map);
}

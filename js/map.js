function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
    });
}

$(window).resize(function () {
    var height = $(window).height(),
    offset = 50;
    $('#map').css('height', (height - offset));
}).resize();

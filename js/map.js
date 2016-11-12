var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2,
        mapTypeId: 'satellite'
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));

    var input = document.getElementById("locationInput")
    var options = {
        bounds: defaultBounds,
        types: ['(cities)']
    }


    var autocomplete = new google.maps.places.Autocomplete(input, options);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');

    var test = createMarker(23, 43);
    test.setMap(map);
    setInformation(test, "Hello");
}

$(window).resize(function () {
    var height = $(window).height(),
    offset = 50;
    $('#map').css('height', (height - offset));
}).resize();

function setLocation(lat, long) {
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long}
    });
    marker.setMap(map);
}

function createMarker(lat, long) {
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long}
    });
    return marker;
}

function setInformation(marker, info) {
    var informationWindow = new google.maps.InfoWindow({
        content: info
    });
    marker.addListener('click', function() {
        informationWindow.open(map, marker);
    });
}

function zoomTo(marker) {
    zoom = map.getZoom();
    var interval = setInterval(function() {
        map.panTo(marker.position);
        zoom += 1;
        map.setZoom(zoom);
        if (zoom >= 24) {
            clearInterval(interval);
            return;
        }
    }, 500);
}

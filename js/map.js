var map;
// global image variable that will determine which photo to drop in the map
var markerimage;
var longitude;
var latitude;

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
    $(document).ready(initAutocomplete());

	// Places a custom marker on map on click
	google.maps.event.addListener(map, 'click', function(event) {
	   placeMarker(event.latLng);
	});

}

function initAutocomplete()
{
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));

    var input = document.getElementById("locationInput");
    var options = {
        bounds: defaultBounds,
        types: ['geocode']
    };


    var autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        console.log("Does this work?");
		var place = autocomplete.getPlace();
		latitude = place.geometry.location.lat();
		longitude = place.geometry.location.lng();
		console.log(latitude);
    });
    //console.log("Does this work? (initAutocomplete)");
}

function getLocation()
{
    console.log("Does this work?");
    var place = autocomplete.getPlace();
    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
	console.log(latitude);
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
	// Prevents scrolling/zooming of the map
	map.setOptions({'scrollwheel': false});
}

$("#marker_images a").click(function(e){
	markerimage = $(this).find("img").attr("src");
	console.log(markerimage);
});

$("#submit").click(function(e){
	var new_marker = createMarker(latitude, longitude);
	zoomTo(new_marker);
});

$(window).keydown(function(event){
    if(event.keyCode == 13) {
        event.preventDefault();
        var new_marker = createMarker(latitude, longitude);
        zoomTo(new_marker);
        return false;
    }
});

function placeMarker(location) {
	var m_icon = {
		url: markerimage, // url
		scaledSize: new google.maps.Size(100, 100), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};

    var marker = new google.maps.Marker({
        position: location,
        map: map,
		animation: google.maps.Animation.DROP,
		icon: m_icon
    });
	marker.addListener('click', toggleBounce);
}

// Prevents the marker from bouncing infinitely
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

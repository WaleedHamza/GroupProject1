
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCgDG1Tbqa6nmT9dK0V8mxNB97H6njq2OU",
    authDomain: "groupproject1-9ed1c.firebaseapp.com",
    databaseURL: "https://groupproject1-9ed1c.firebaseio.com",
    projectId: "groupproject1-9ed1c",
    storageBucket: "",
    messagingSenderId: "354989499516"
  };
  firebase.initializeApp(config);



  // firebase test
  var database = firebase.database();
  var clickCounter = 0;

  $("#click-button").on("click", function(){
    clickCounter++;
  database.ref().set({
    clickCount: clickCounter
  });
});


  // google maps functions
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lng: -79.0249956, lat: 36.0017455},
    zoom: 8
  });
}

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails({
    placeId: 'ChIJ8WYPEnHkrIkRfvJGionaeuE'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });
    }
  });
  // function initMap() {
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -33.8688, lng: 151.2195},
  //     zoom: 13
  //   });

  //   var input = document.getElementById('pac-input');

  //   var autocomplete = new google.maps.places.Autocomplete(input);
  //   autocomplete.bindTo('bounds', map);

  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //   var infowindow = new google.maps.InfoWindow();
  //   var infowindowContent = document.getElementById('infowindow-content');
  //   infowindow.setContent(infowindowContent);
  //   var marker = new google.maps.Marker({
  //     map: map
  //   });
  //   marker.addListener('click', function() {
  //     infowindow.open(map, marker);
  //   });

  //   autocomplete.addListener('place_changed', function() {
  //     infowindow.close();
  //     var place = autocomplete.getPlace();
  //     if (!place.geometry) {
  //       return;
  //     }

  //     if (place.geometry.viewport) {
  //       map.fitBounds(place.geometry.viewport);
  //     } else {
  //       map.setCenter(place.geometry.location);
  //       map.setZoom(17);
  //     }

  //     // Set the position of the marker using the place ID and location.
  //     marker.setPlace({
  //       placeId: place.place_id,
  //       location: place.geometry.location
  //     });
  //     marker.setVisible(true);

  //     infowindowContent.children['place-name'].textContent = place.name;
  //     infowindowContent.children['place-id'].textContent = place.place_id;
  //     infowindowContent.children['place-address'].textContent =
  //         place.formatted_address;
  //     infowindow.open(map, marker);
  //   });
  // }

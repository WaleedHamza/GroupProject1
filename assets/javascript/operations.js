var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lng: -79.0249956, lat: 36.0017455},
    zoom: 8
  });
}
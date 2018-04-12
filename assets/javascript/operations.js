$(document).ready(function(){
  $('.parallax').parallax();
});
  
  
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
//search buttoon functions//

var address = "";
var title = "";

// $("#searchBtn").click(function(){
//   $("#searchDiv").show(300);
// });

$("#goBtn").click(function(){
  address = $("#address").val().trim().replace(/\s/g, "+");
  title = $("#title").val().trim().replace(/\s/g, "+");
  
  
console.log("placesLocaion: " + address);
  // if(title === "" && address === ""){
  //   alert("Please tell us where should we look ?! ")
  //   return false
  // }else{
  //   $("#searchDiv").hide(300);
  //}

  // ajax to pull lat and lng for initial map
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + address + "&search=" + title + "&key=AIzaSyDYL3PAu6qXoGN_ii_Ld_cfYCQ7FY-AMl0",
    method: "GET"
  }).then(function(spot) {
    console.log(spot.results["0"].geometry.location.lat);
    console.log(spot.results["0"].geometry.location.lng);
    initMap(spot.results["0"].geometry.location.lat, spot.results["0"].geometry.location.lng)
  })

  
  // ajax to pull jobs based on search location
  var zipQueryURL = "https://api.ziprecruiter.com/jobs/v1?search=Perl%20Job&location="+ address +"&radius_miles=25&days_ago=&jobs_per_page=10&page=1&api_key=gjetj6yzdta73384442bezn9sp8tfwbe";
  console.log(zipQueryURL);

  $.ajax({
    url: zipQueryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i<response.jobs.length; i++) {
    searchCompanies.push(response.jobs[i].hiring_company.name)
    //console.log(searchCompanies)
    locations.push(response.jobs[i].location)
    // console.log(locations)
    };
    console.log(searchCompanies);
    console.log(searchCompanies[1]);
});

  // google maps functions
  var map;
  var infowindow;
  function initMap(intLat, intLng) {
    var durham = {lng: intLng, lat: intLat };
    console.log(durham);
  
    map = new google.maps.Map(document.getElementById('map'), {
      center: durham,
      zoom: 10
    });
 
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: durham,
      radius: 35000,
      // change this to get different companies to display on map using searchCompanies array
      name: ["RiVi Consulting"]
    }, callback);
  }
  
  function callback(results, status) {
    // console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }
  
  // creating pins on map
  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  // Zip recruiter api test and pushing company name and location into arrays 
var searchCompanies = [];
var locations = [];
// take user input and place location here
// var searchPlace = "durham";
  });

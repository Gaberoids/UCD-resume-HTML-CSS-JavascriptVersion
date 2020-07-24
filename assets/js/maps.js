function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    //This object exists in google maps API. "map is the id from div where map will be displayed"
    zoom: 3,
    center: {
      //initial localization that the map shows when loaded for the first time
      lat: 46.619261,
      lng: -33.134766,
    },
  });

  var labels = "ABCDEFGHIJKMNOPQRSTUVWXYZ";

  var locations = [
    { lat: 40.785091, lng: -73.968285 },
    { lat: 41.084045, lng: -73.874245 },
    { lat: 40.754932, lng: -73.984016 },
  ];

  var markers = locations.map(function (location, i) {
    // this map() function has nothing to do with google maps. this is a javascript function that works like a foreach loop but returns an arrays with the results from each loop
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length], // the percentage label will make sure that if we run out of letter, it starts from A again instead of throwing an error.
    });
  });
  // the following two lines of code will create a mark in the map or a cluster, if the marks are closed to gether.
  const imagePath = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
  var markerClusterer = new MarkerClusterer(map, markers, {
    imagePath: imagePath,
  });
}

function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   }
  
navigator.geolocation.getCurrentPosition(success);
console.log(getCurrentPosition());


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


var apiKey = '';

var inputEl = document.getElementById('artist-search');
var artist = inputEl.value;

function getArtistData() {
    // event.preventDefault();

    // var citySearch = document.getElementById('city-search');
    // var city = citySearch.value;

    // if (savedCity) {
    //     city = savedCity
    // }
    
    var queryUrl = "https://api.songkick.com/api/3.0/artists/{artist_id}/calendar.json" + "?apikey=" + apiKey;
      
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
            }
        )
        .then(function (data) {
            coordinates = [data.coord.lat, data.coord.lon];
            searchedCity = data.name;
            displayCityName(searchedCity);              
            getForecast();
            storeCities(searchedCity);
            getStoredCities(searchedCity);
            }
        );   
}
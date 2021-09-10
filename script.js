// function success(pos) {
//     var crd = pos.coords;
  
//     console.log('Your current position is:');
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
//     console.log(`More or less ${crd.accuracy} meters.`);
//   }
  
// //   function error(err) {
// //     console.warn(`ERROR(${err.code}): ${err.message}`);
// //   }
  
// navigator.geolocation.getCurrentPosition(success);
// console.log(getCurrentPosition(pos));


let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 12,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            // zoom: 21,
          };

        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent("Location found.");
        //   infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }
  });
}

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }
















// var apiKey = 'WAITING ON SONGKICK :(';

// var inputEl = document.getElementById('artist-search');
// var artist = inputEl.value;

// function getArtistId() {
//     // event.preventDefault();

//     // var citySearch = document.getElementById('city-search');
//     // var city = citySearch.value;

//     // if (savedCity) {
//     //     city = savedCity
//     // }
    
//     var queryUrl = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + apiKey + "&query=" + artist;
      
//     fetch(queryUrl)
//         .then(function (response) {
//             return response.json();
//             }
//         )
//         .then(function (data) {
//             artistId = data.resultsPage.results.artist.id;
//             // searchedCity = data.name;
//             getArtistData(artistId);              
//             // getForecast();
//             // storeCities(searchedCity);
//             // getStoredCities(searchedCity);
//             }
//         );   
// }
// // function getArtistData(data) {

// //     var queryUrl2 = https://api.songkick.com/api/3.0/artists/{artist_id}/calendar.json?apikey={your_api_key}
    
// //
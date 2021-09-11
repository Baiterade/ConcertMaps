let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 11,
    });
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {lat: position.coords.latitude, lng: position.coords.longitude};
            map.setCenter(pos);
        });
    }

}
















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
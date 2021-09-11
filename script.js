function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
navigator.geolocation.getCurrentPosition(success);


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

document.getElementById("submit").addEventListener("click", getArtistData);

function getArtistData() {

  var artist = document.getElementById('artist-search').value;

  var artistId;

    fetch("https://api.songkick.com/api/3.0/search/artists.json?apikey=gKmSw1OM4IAL8F8j&query=" + artist)
        .then(function (response) {
            return response.json();
            }
        )
        .then(function (data) {
            console.log(data);

            artistId = data.resultsPage.results.artist[0].id;
            }
        );   

    fetch("https://api.songkick.com/api/3.0/artists/" + artistId + "/calendar.json?apikey=gKmSw1OM4IAL8F8j")
  
      .then(function (response) {
        return response.json();
       }
        )
      .then(function (data) {
        console.log(data);
        }
  );  

}
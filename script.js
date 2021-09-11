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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {lat: position.coords.latitude, lng: position.coords.longitude};

      map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 8,
      });
    })
  };
  
}

document.getElementById("submit").addEventListener("click", getArtistData);

var artistId;
var concertInfo;

function getArtistData() {

  var artist = document.getElementById('artist-search').value;

  fetch("https://api.songkick.com/api/3.0/search/artists.json?apikey=gKmSw1OM4IAL8F8j&query=" + artist)
    .then(function (response) {
      return response.json();
    }
    )
    .then(function (data) {
      console.log(data);

      artistId = data.resultsPage.results.artist[0].id;

      getConcerts();
    }
    );

}

function getConcerts() {

  fetch("https://api.songkick.com/api/3.0/artists/" + artistId + "/calendar.json?apikey=gKmSw1OM4IAL8F8j")

    .then(function (response) {
      return response.json();
    }
    )
    .then(function (data) {
      console.log(data);

      concertInfo = data.resultsPage.results.event;

      generateMarkers();
    }
    );

}

function generateMarkers(){
  for(i = 0; i < concertInfo.length; i++){
    new google.maps.Marker({
      position: { lat: concertInfo[i].venue.lat, lng:concertInfo[i].venue.lng },
      map,
      title: "Hello World!",
    });
  }
}
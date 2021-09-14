function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

navigator.geolocation.getCurrentPosition(success);


let map;
let allMarkers = [];

function initMap() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {lat: position.coords.latitude, lng: position.coords.longitude};

      map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 9,

        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.attraction",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          },
          {
            "featureType": "poi.sports_complex",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f75641"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#f75641"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }],

      });
    })
  };
  
}


getStoredArtists();

document.getElementById("submit").addEventListener("click", getArtistData);

var artistId;
var concertInfo;

function getArtistData(event, savedArtist) {
  event.preventDefault();

  var artist = document.getElementById('artist-search').value;
  
  if (savedArtist) {
    artist = savedArtist
  }

  fetch("https://api.songkick.com/api/3.0/search/artists.json?apikey=gKmSw1OM4IAL8F8j&query=" + artist)
    .then(function (response) {
      return response.json();
      }
    )
    .then(function (data) {
      console.log(data);

      artistId = data.resultsPage.results.artist[0].id;
      artistName = data.resultsPage.results.artist[0].displayName;

      getConcerts();
      storeArtist(artistName);
      // getStoredArtists(artistName);
      }
    );

}

var searchedArtists = [];
// var searchedArtists = localStorage.getItem("artists");

// if (localStorage.getItem("artists") === null) {
//   searchedArtists = [];
// }
function storeArtist() {
  searchedArtists.push(artistName);
  localStorage.setItem("artists", JSON.stringify(searchedArtists));
}

function getStoredArtists() {
    var storedArtists = JSON.parse(localStorage.getItem("artists"));

    if (storedArtists === null) {
      return;
    } else {
      var searchHistory = document.getElementById('artist-buttons');
      searchHistory.innerHTML = '';
    
      for (var i = 0; i < storedArtists.length; i++) {
          var artistButton = document.createElement("button");
    
          artistButton.addEventListener('click', function(event) {
              getArtistData(event, event.target.textContent)
          })
    
          artistButton.textContent = storedArtists[i];
          searchHistory.appendChild(artistButton);
      }
    }

  function clearHistory() {
    // localStorage.setItem("artists", );
    searchedArtists.splice(0, searchedArtists.length);
    searchHistory.innerHTML = '';
  }
  
  var clearArtists = document.getElementById('clear-artists');
  clearArtists.addEventListener('click', clearHistory);
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

      generateMarkers(concertInfo);
      }
    );

}

function generateMarkers() {

  function setMapOnAll(map) {
    for (let i = 0; i < allMarkers.length; i++) {
      allMarkers[i].setMap(map);
    }
  }

  function hideMarkers() {
    setMapOnAll(null);
  }

  function deleteMarkers() {
    hideMarkers();
    allMarkers = [];
  }

  deleteMarkers();

  for(i = 0; i < concertInfo.length; i++){
    const marker = new google.maps.Marker({
      position: {lat: concertInfo[i].venue.lat, lng: concertInfo[i].venue.lng},
      map,
    });

    allMarkers.push(marker);

    var milTime = concertInfo[i].start.time;

    function convertMilTime() {
      if (milTime === null) {
        return '';
      } else {
        milTime.split(':');
      }

      var hour = (milTime.split(':'))[0];
      var minute = (milTime.split(':'))[1];

      var hourNum = parseInt(hour, 10);
      var convHour = hourNum - 12;
      
      if (hourNum >= 13 && hourNum <= 23) {
        return convHour + ':' + minute + ' P.M.';
      } else if (hourNum === 12) {
        return hourNum + ':' + minute + ' P.M.';
      } else if (hourNum === 24 || hourNum === 00) {
        return '12' + ':' + minute + ' A.M.';
      } else {
        return hour + ':' + minute + ' A.M.'; 
      }
    }

    const concertString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' + concertInfo[i].displayName + '</h1>' +
      '<h3>' + concertInfo[i].location.city + '</h3>' +
      '<h4>' + convertMilTime() + '</h4>' +
      '<div id="bodyContent">' +
      "<p></p>" +
      '<p><a href="' + concertInfo[i].uri + '">' + "BUY TICKETS</a></p>" +
      "</div>" +
      "</div>";
    
    const infowindow = new google.maps.InfoWindow({
      content: concertString,
    });

    allMarkers[i].addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });
  }

}
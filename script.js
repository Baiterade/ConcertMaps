var historyDiv = document.getElementById('search-history');

if (window.matchMedia("(max-width: 1024px)").matches) {
  historyDiv.setAttribute("class", "condensed")
} 

var expandBtn = document.getElementById('expand-btn');
expandBtn.addEventListener("click", showHistoryDiv);

function showHistoryDiv() {
  if ((historyDiv.getAttribute("class")) === "condensed") {
    historyDiv.setAttribute("class", "expanded")
  } else {
    historyDiv.setAttribute("class", "condensed")
  }
}
var currentLat;
var currentLng;

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  currentLat = crd.latitude;
  currentLng = crd.longitude;
}

navigator.geolocation.getCurrentPosition(success);


let map;
let allMarkers = [];

function initMap() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = { lat: position.coords.latitude, lng: position.coords.longitude };

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
                "color": "#ffffff"
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
                "color": "#374151"
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
                "color": "#6b7280"
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
                "color": "#ef4444"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ef4444"
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
                "color": "#c7c7c7"
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

document.getElementById("submit").addEventListener("click", submitClicked);

function submitClicked() {
  getArtistData();
  getStoredArtists();
}

var artistId;
var concertInfo;

function getArtistData(savedArtist) {

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
      storeArtist();
    }
    );

}

var searchedArtists = [];

if (localStorage.getItem("artists")) {
  searchedArtists = JSON.parse(localStorage.getItem("artists"));
}
function storeArtist() {

  if (document.getElementById('artist-search').value) {
    searchedArtists.push(artistName);
    localStorage.setItem("artists", JSON.stringify(searchedArtists));
    document.getElementById('artist-search').value = "";
  }
}

function getStoredArtists() {

  var searchHistory = document.getElementById('artist-buttons');

  searchHistory.innerHTML = '';

  if (localStorage.getItem("artists")) {

    var storedArtists = JSON.parse(localStorage.getItem("artists"));

    for (var i = 0; i < storedArtists.length; i++) {
      var artistButton = document.createElement("button");

      artistButton.addEventListener('click', function (event) {
        getArtistData(event.target.textContent)
      })

      artistButton.textContent = storedArtists[i];
      searchHistory.appendChild(artistButton);
    }
  }

  function clearHistory() {

    searchedArtists = [];

    if (localStorage.getItem("artists")) {

      localStorage.setItem("artists", "");

      getStoredArtists();
    }
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

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
  draggable: false,
  map,
  });

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

  for (i = 0; i < concertInfo.length; i++) {

    const marker = new google.maps.Marker({
      position: { lat: concertInfo[i].venue.lat, lng: concertInfo[i].venue.lng },
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

      directionsRenderer.set("directions", null);

      directionsService.route({
        origin: { lat: currentLat, lng: currentLng },
        destination: marker.position,
        waypoints: [],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: false,
      })
        .then((result) => {
          directionsRenderer.setDirections(result);
        })
    });

  }

  getStoredArtists();
  
}
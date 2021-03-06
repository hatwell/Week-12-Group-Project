var CrimeIcons = require('./models/crimeIcons')

var MapWrapper = function(mapDiv, coords, zoom) {

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.geocoder = new google.maps.Geocoder();
  this.marker = new google.maps.Marker();
  this.crimeIcons = new CrimeIcons();
  this.gmarkers = [];
  console.log(this.gmarkers);

  this.googleMap = new google.maps.Map(mapDiv, {
    center: coords,
    zoom: zoom,
    scrollwheel: false
  });

  this.directionsDisplay.setMap(this.googleMap);
}


MapWrapper.prototype = {

  geocodeAddress: function(address, callback) {
    var ukAddress = address + " United Kingdom"
    this.geocoder.geocode({'address': ukAddress}, function(results, status) {

      if (status === 'OK') {

        var latlng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};

        callback(latlng)

        this.googleMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: this.googleMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }.bind(this));
  },

  addMarker: function (coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
    });
    this.gmarkers.push(marker);

  },

  addCrimeMarker: function(crimeImage, coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      icon: crimeImage
    })
    this.gmarkers.push(marker);

  },

  filterCrimeIcons: function(crime, coords){
    var crimeIconObj = this.crimeIcons.crimePics
    var imgKeys = Object.keys(crimeIconObj)
    var imgSrc = Object.values(crimeIconObj)

    for(var key of imgKeys){
      if(key === crime.category){
        var crimeImage = {
        url: crimeIconObj[key],
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
        }
      this.addCrimeMarker(crimeImage, coords)
      }
    }
  },

  addClickEvent: function (){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }

    }.bind(this));
  },

  geoLocate: function(){
    navigator.geolocation.getCurrentPosition(function(position){
      var center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleMap.setCenter(center);
      this.addMarker(center);
    }.bind(this));
  },

  setCenter: function(position){
    this.googleMap.setCenter(position);
  },

  removeMarkers: function(){
    for (marker of this.gmarkers){
      marker.setMap(null);
    }
  }


}

module.exports = MapWrapper;

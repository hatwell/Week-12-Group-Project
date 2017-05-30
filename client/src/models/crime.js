var Crime = function(options) {
  this.category = options.crime.category,
  this.lat = options.crime.location.latitude;
  this.lng = option.crime.location.longitude;
}

// these are the options that come back from the API 
//   "crime": {
// "category": "other-theft",
// "location_type": "Force",
// "location": {
// "latitude": "54.971123",
// "street": {
// "id": 1024559,
// "name": "On or near Nightclub"
// },
// "longitude": "-1.611537"
// },
// "context": "",
// "persistent_id": "1f84bbf1c5eb903a3c9e550677a4fa4a06ffd49c84810ead12061cfa25d273a4",
// "id": 19067300,
// "location_subtype": "NIGHTCLUBS",
// "month": "2012-12"
// }

Crime.prototype = {

}

module.exports = Crime;

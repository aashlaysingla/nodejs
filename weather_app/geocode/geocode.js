const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
  	url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBRbe9sdNfgBMy92oREo_3K4TnKrvCExco&&address=${encodedAddress}`,
  	json: true
  }, (err,response,body) => {
  	if (err) {
  		callback('Unable to connect to GOOGLE servers');
  	} else if (body.status === 'ZERO_RESULTS') {
  		callback(`Unable to find the address: ${address}`);
  	} else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
  	}
  });
};

module.exports = {
  geocodeAddress
};

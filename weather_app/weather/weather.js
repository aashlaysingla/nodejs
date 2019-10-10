const request = require('request');

var getWeather = (latitude, longitude, callback) => {

  request({
  	url: `https://api.darksky.net/forecast/b2abb15733835f9e871c94221b2bc562/${latitude},${longitude}`,
  	json: true
  }, (error, response, body) => {
  	if (!error && response.statusCode === 200) {
      var temperature = {
        apparentTemperature: body.currently.apparentTemperature,
        temperature: body.currently.temperature
      };
  		callback(undefined,temperature);
  	} else {
  		callback('Unable to fetch weather');
  	}
  });

};

module.exports = {
  getWeather
};

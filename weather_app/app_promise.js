const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBRbe9sdNfgBMy92oREo_3K4TnKrvCExco&&address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find the address');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/b2abb15733835f9e871c94221b2bc562/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature} but it feels like ${apparentTemperature}`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(e.message);
	}
});

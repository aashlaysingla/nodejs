const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

//hahhahaha
// hahahhaha
/// hahahhahahha

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log('--');
		console.log(results.address);
		weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`It feels like ${weatherResults.apparentTemperature} but it actually is ${weatherResults.temperature}`);
				// console.log(JSON.stringify(weatherResults, undefined, 2));
			}
		});
	}
});

// Foursquare API Info
const clientId = '3CUIXXNWFGTUAU1XAFW1KJBGO3MVOBJUKXF0GHXTGMRQW1PI';
const clientSecret = 'UWOBCZSG4KGFWR2TAP3KU3SC2C0YKWX1A22KFXQYK24MF2ZS';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'e2cd59fff3e4045d18636e9ea29e3c00';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const cnt = 4;
// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
 const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20211013`;

 try {
 const response = await fetch(urlToFetch);
 if (response.ok){
console.log(response);
const jsonResponse = await response.json();
console.log(jsonResponse);

const venues = jsonResponse.response.groups[0].items.map (item => item.venue);
console.log(venues);
return venues;
 }
 else { 
   throw new Error('Request failed!')
   }
 }
catch (error) {
 console.log(error.message);
 }
}
const getForecast = async () => {
const urlToFetch = `${weatherUrl}&q=${$input.val()}&appid=${openWeatherKey}`;

try {
const response = await fetch(urlToFetch);

if (response.ok){
console.log(response);
const jsonResponse = await response.json();
console.log(jsonResponse);
 return jsonResponse;
} else { 
   throw new Error('Request failed!')
   }
}

catch (error) {
 console.log(error.message);
  }
 
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
     const venue = venues[index];
     const venueIcon = venue.categories[0].icon;
     const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;


    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  //Using HTML template: 
  //const weatherContent = '<h2>' + weekDays[(new Date()).getDay()] + '</h2> <h2>Temperature: ' + ((day.main.temp - 273.15) * 9 / 5 + 32).toFixed(0) + '&deg;F</h2> <h2>Condition: ' + day.weather[0].description + '</h2> <img src="https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png">'
  $weatherDiv.append(weatherContent);
};
const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then (forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
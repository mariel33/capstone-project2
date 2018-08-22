const Weather = require("./models").Weather;
const request = require("request");

module.exports = {
    getWeather(zip, callback){
        const apiKey = '6a8bd9a4e12c4a85393777ba6f320bde';
        const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

        request(url, (err, res, body) => {
            if(err) {
                console.log(err)
            } else {
                console.log(body)
                let myWeather = JSON.parse(body);
                console.log(myWeather);
                let newWeather = {
                    city: myWeather.name,
                    temperature: myWeather.main.temp,
                    conditions: myWeather.weather[0].description,
                    wind: myWeather.wind.speed,
                };
                console.log(newWeather);
                this.createWeather(newWeather, callback);
            }
        });
    },
    createWeather(newWeather, callback) {
        return Weather.create({
            city: newWeather.city,
            temperature: newWeather.temperature,
            conditions: newWeather.conditions,
            wind: newWeather.wind
        })
        .then((weather) => {
            callback(null, weather);
        })
        .catch((err) => {
            callback(err);
        })
    },

    findWeather(id, callback) {
        return Weather.findById(id)
        .then((weather) => {
            callback(null, weather)
        })
        .catch((err) => {
            callback(err);
        })
    }
}
const weatherQueries = require("../db/queries.weather.js");
const request = require("request");

module.exports = {
    index(req, res, next) {
        res.send("List the weather");
    },

    new(req, res, next) {
        res.render("weather/new");
    },

    create(req, res, next) {
        console.log(req.body.zipCode);
        weatherQueries.getWeather(req.body.zipCode, (err, weather) => {
            if(err) {
                console.log(err);
                res.redirect(500, "/weather/new");
            } else {
                res.redirect(303, `/weather/${weather.id}`)
            }
        });
    },

    show(req, res, next) {
        weatherQueries.findWeather(req.params.id, (err, weather) => {
            if(err || weather == null) {
                res.redirect(404, "/");
            } else {
                res.render("weather/show", {weather})
            }
        });
    }
}
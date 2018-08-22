const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/weather/";
const sequelize = require("../../src/db/models/index").sequelize;
const Weather = require("../../src/db/models").Weather;

describe("routes : weather", () => {

    beforeEach((done) => {
        this.weather;
        sequelize.sync({force:true}).then((res) => {

            Weather.create({
                zipCode: 94040
            })
            .then((weather) => {
                this.weather = weather;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /weather/new", () => {

        it("should return a status code 200", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });

        it("should render a field to enter location", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("What's the weather today?");
                done();
            })

        });
    });

    describe("POST /weather/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                zipCode: 94040
            }
        };
        it("should create a new weather condition and redirect", (done) => {

            request.post(options,
            
            (err, res, body) => {
                Weather.findOne({where: {city: "Mountain View" }})
                .then((weather) => {
                    expect(res.statusCode).toBe(303);
                    expect(weather.city).toBe("Mountain View");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /weather/:id", () => {

        it("should render a view with weather for entered zip code", (done) => {
            request.get(`${base}${this.weather.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Weather");
                done();
            })

        })

    })
});
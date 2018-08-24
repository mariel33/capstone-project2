const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/criteria/";
const sequelize = require("../../src/db/models/index").sequelize;
const Criteria = require("../../src/db/models").Criteria;

describe("routes : criteria", () => {

    beforeEach((done) => {
        this.criteria;
        sequelize.sync({force: true}).then((res) => {

            Criteria.create({
                activity: "Work",
                dresscode: "Business Casual"
            })
            .then((criteria) => {
                this.criteria = criteria;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })

    describe("GET /criteria/new", () => {
        it("should return a status code of 200", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done()
            });
        });

        it("should render a drop down with options for activity and dresscode", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(body).toContain("What are your plans for today?");
                done();
            });
        });
    });

    describe("POST /criteria/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                activity: "Work",
                dresscode: "Business Casual"
            }
            
        };
        it("should create a new outfit criteria and redirect", (done) => {
            request.post(options,
            
            (err, res, body) => {
                Criteria.findOne({where: {activity: "Work"}})
                .then((criteria) => {
                    expect(res.statusCode).toBe(303);
                    expect(criteria.activity).toBe("Work");
                    expect(criteria.dresscode).toBe("Business Casual");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /criteria/:id", () => {
        
        it("should render a view with the selected outfit criteria", (done) => {
            request.get(`${base}${this.criteria.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Business Casual");
                done();
            });
        });
    });


});
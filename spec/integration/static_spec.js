const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000";

describe("routes : static", () => {

    describe("GET /", () => {

       it("should return status code 200 and have 'Nothing to Wear' in the body of the response", () => {
            
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toContain("Nothing to Wear");
            });
        });

        it("should render a field to enter location", (done) => {
            request.get(base, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("What's the weather today?");
                done();
            })

        })
    });
});
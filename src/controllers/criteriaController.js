const criteriaQueries = require("../db/queries.criteria.js");

module.exports = {
    index(req, res, next) {
        res.send("show criteria");
    },
    new(req, res, next){
        res.render("criteria/new")
    },
    create(req, res, next){
        let newCriteria = {
            activity: req.body.activity,
            dresscode: req.body.dresscode
        };
        criteriaQueries.addCriteria(newCriteria, (err, criteria) => {
            if(err) {
                res.redirect(500, "/criteria/new");
            } else {
                res.redirect(303, `/criteria/${criteria.id}`)
            }
        });
    },
    show(req, res, next){
        criteriaQueries.getCriteria(req.params.id, (err, criteria) => {
            if(err || criteria == null) {
                res.redirect(404, "/");
            } else {
                res.render("criteria/show", {criteria})
            }
        });
    }
}
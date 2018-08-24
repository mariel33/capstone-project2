const Criteria = require("./models").Criteria;

module.exports = {
    addCriteria(newCriteria, callback) {
        return Criteria.create({
            activity: newCriteria.activity,
            dresscode: newCriteria.dresscode
        })
        .then((criteria) => {
            callback(null, criteria);
        })
        .catch((err) =>{
            callback(err);
        })
    },
    getCriteria(id, callback) {
        return Criteria.findById(id)
        .then((criteria) => {
            callback(null, criteria);
        })
        .catch((err) => {
            callback(err);
        })
    }
    
}
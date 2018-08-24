module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const weatherRoutes = require("../routes/weather");
      const criteriaRoutes = require("../routes/criteria");


      app.use(staticRoutes);
      app.use(weatherRoutes);
      app.use(criteriaRoutes);
    }
  }
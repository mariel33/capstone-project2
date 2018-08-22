module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const weatherRoutes = require("../routes/weather");


      app.use(staticRoutes);
      app.use(weatherRoutes);
    }
  }
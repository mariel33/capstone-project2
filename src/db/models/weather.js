'use strict';
module.exports = (sequelize, DataTypes) => {
  var Weather = sequelize.define('Weather', {
    city: DataTypes.STRING,
    temperature: DataTypes.INTEGER,
    conditions: DataTypes.STRING,
    wind: DataTypes.INTEGER
  }, {});
  Weather.associate = function(models) {
    // associations can be defined here
  };
  return Weather;
};
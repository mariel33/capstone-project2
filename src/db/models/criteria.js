'use strict';
module.exports = (sequelize, DataTypes) => {
  var Criteria = sequelize.define('Criteria', {
    activity: DataTypes.STRING,
    dresscode: DataTypes.STRING
  }, {});
  Criteria.associate = function(models) {
    // associations can be defined here
  };
  return Criteria;
};
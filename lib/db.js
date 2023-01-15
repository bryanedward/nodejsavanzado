const Sequelize = require("sequelize");
let sequelize = null;

module.exports = async function setupDatabase(config) {
  if (!sequelize) {
    sequelize = new Sequelize(config);
  }
  return sequelize;
};

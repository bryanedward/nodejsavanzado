// const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const setupDatabase = require("../lib/db");

module.exports = async function setupAgentModel(config) {
  const sequelize = await setupDatabase(config);
  return sequelize.define("agent", {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hostname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    connected: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },
  });
};

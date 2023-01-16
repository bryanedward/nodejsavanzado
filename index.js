require("dotenv").config();
const setupDatabase = require("./lib/db");
const setupAgentModel = require("./models/agent");
const setupAgent = require("./lib/agent");
const setupAgentMetric = require("./models/metric");
const defaults = require("defaults");

module.exports = async function (config) {
  config = defaults(config, {
    dialect: "sqlite",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    query: {
      raw: true,
    },
  });
  const sequelize = await setupDatabase(config);
  const AgentModel = await setupAgentModel(config);
  const metricModel = await setupAgentMetric(config);

  AgentModel.hasMany(metricModel);
  metricModel.belongsTo(AgentModel);

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }
  const Agent = setupAgent(AgentModel);
  const Metric = {};
  return {
    Agent,
    Metric,
  };
};

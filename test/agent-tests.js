const test = require("ava");
const proxyrequire = require("proxyquire");
const sinon = require("sinon");
let db = null;
let sandbox = null;
let config = {};
let AgentStub = null;
let MetricSub = {
  belongsTo: sinon.spy(),
};

test.beforeEach(async () => {
  sandbox = sinon.createSandbox();
  AgentStub = {
    hasMany: sandbox.spy(),
  };
  const setupDatabase = proxyrequire("../", {
    "./models/agent": () => AgentStub,
    "./models/metric": () => MetricSub,
  });
  console.log(
    "🚀 ~ file: agent-tests.js:18 ~ test.beforeEach ~ setupDatabase",
    setupDatabase
  );

  db = await setupDatabase(config);
});

test.afterEach(() => {
  sandbox && sinon.restore();
});

test("agent", (t) => {
  t.truthy(db.Agent, "ok");
});

test.serial("setup", (t) => {
  t.true(AgentStub.hasMany.called, "AgentModel.AgentStub");
  t.true(AgentStub.hasMany.calledWith(MetricSub), "AgentStub called Metric");
  t.true(MetricSub.belongsTo.called, "MetricModel.MetricSub");
  t.true(
    MetricSub.belongsTo.calledWith(AgentStub),
    "MetricSub called  AgentStub"
  );
});

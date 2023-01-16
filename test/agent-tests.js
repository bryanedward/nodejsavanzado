const test = require("ava");
const proxyrequire = require("proxyquire");
const sinon = require("sinon");
const agentFixtures = require("./fixtures/agent");
let db = null;
let sandbox = null;
let config = {};
let AgentStub = null;
let MetricSub = {
  belongsTo: sinon.spy(),
};
let single = Object.assign({}, agentFixtures.single);
let uuid = "yyy-yyy-yyy";
let id = 1;
const uuidArgs = {
  where: {
    uuid,
  },
};
let connectedArgs = {
  where: { connected: true },
};

let usernameArgs = {
  where: { username: "xxx", connected: true },
};

let newAgent = {
  uuid: "yyy-yyy-yyyx",
  name: "funxturex",
  username: "edwardx",
  hostname: "text-honstx",
  pid: 0,
  connected: true,
};

test.beforeEach(async () => {
  sandbox = sinon.createSandbox();
  AgentStub = {
    hasMany: sandbox.spy(),
  };

  // model update stub
  AgentStub.update = sandbox.stub();
  AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single));
  // model findByID stub
  AgentStub.findById = sandbox.stub();
  AgentStub.findById
    .withArgs(id)
    .returns(Promise.resolve(agentFixtures.byId(id)));
  //model findOne stub
  AgentStub.findOne = sandbox.stub();
  AgentStub.findOne
    .withArgs(uuidArgs)
    .returns(Promise.resolve(agentFixtures.byUuid(uuid)));
  // model findAll agent
  AgentStub.findAll = sandbox.stub();
  AgentStub.findAll.withArgs().returns(Promise.resolve(agentFixtures.all));
  //moded create agent
  AgentStub.create = sandbox.stub();
  AgentStub.create.withArgs(newAgent).returns(
    Promise.resolve({
      toJSON() {
        return newAgent;
      },
    })
  );
  const setupDatabase = proxyrequire("../", {
    "./models/agent": () => AgentStub,
    "./models/metric": () => MetricSub,
  });

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

test.serial("agent findbyid ", async (t) => {
  let agent = await db.Agent.findById(id);
  t.true(AgentStub.findById.called);
  t.true(AgentStub.findById.calledOnce);
  t.true(AgentStub.findById.calledWith(id));
  t.deepEqual(agent, agentFixtures.byId(id));
});

test.serial("agent create or update", async (t) => {
  let agent = await db.Agent.createOrUpdate(single);
  t.true(AgentStub.findOne.called);
  t.true(AgentStub.findOne.calledTwice);
  t.true(AgentStub.update.calledOnce);
  t.deepEqual(agent, single);
});

const test = require("ava");
let db = null;
let config = {};
test.beforeEach(async () => {
  const setupDatabase = require("../");
  db = await setupDatabase(config);
});

test("agent", (t) => {
  t.truthy(db.Agent, "ok");
});

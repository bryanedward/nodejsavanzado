module.exports = function setuAgent(AgentModel) {
  function findByUuid(uuid) {
    return AgentModel.findOne({
      where: {
        uuid,
      },
    });
  }

  function findAll() {
    return AgentModel.findAll();
  }

  function findConnected() {
    return AgentModel.findAll({
      where: {
        connected: true,
      },
    });
  }

  function findById(id) {
    return AgentModel.findById(id);
  }

  async function createOrUpdate(agent) {
    const cond = {
      where: {
        uuid: agent.uuid,
      },
    };
    const existingAgent = await AgentModel.findOne(cond);
    if (existingAgent) {
      const updated = await AgentModel.update(agent, cond);
      return updated && AgentModel.findOne(cond);
    }

    const result = await AgentModel.create(agent);
    return result.toJSON();
  }
  return {
    findById,
    createOrUpdate,
    findByUuid,
    findAll,
    findConnected,
  };
};

const agent = {
  id: 1,
  uuid: "yyy-yyy-yyy",
  name: "funxture",
  username: "edward",
  hostname: "text-honst",
  pid: 0,
  connected: true,
  createAt: new Date(),
  updatedAt: new Date(),
};

const agents = [
  agent,
  extend(agent, {
    id: 2,
    uuid: "fsfsf-dfs-s",
    connected: false,
    username: "bain",
  }),
  extend(agent, {
    id: 3,
    uuid: "fsfsf-ddsad",
    connected: false,
  }),
  extend(agent, {
    id: 4,
    uuid: "fsfsf-dfvvv s",
    connected: false,
  }),
];

function extend(obj, values) {
  const clone = Object.assign({}, obj);
  return Object.assign(clone, values);
}

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter((a) => a.connected),
  byUuid: (id) => agents.filter((a) => a.uuid === id).shift(),
  byId: (id) => agents.filter((a) => a.id === id).shift(),
};

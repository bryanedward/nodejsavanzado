require("dotenv").config();
const debug = require("debug")("nodejsia:db:setup");
const index = require("./index");
const inquirer = require("inquirer");

const prompt = inquirer.createPromptModule();

async function setup() {
  const answer = await prompt({
    type: "confirm",
    name: "setup",
    message: "this will destroy, are u sure?",
  });

  if (!answer.setup) {
    return console.log("not pass nothing");
  }

  const config = {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: "postgres",
    logging: (s) => debug(s),
    setup: true,
  };
  index(config).catch(handleError);
}

function handleError(error) {
  console.log("🚀 ~ file: setup.js:17 ~ error", error);
}

setup();

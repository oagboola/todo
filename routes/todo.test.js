const request = require("supertest");
const app = require("../server.js");
const { Todo } = require("../models/index.js");

beforeEach(async () => {
  await Todo.destroy({ where: {}, force: true });
});

describe("Todo API", () => {
  it("should create a new todo", async () => {});
  it("should update an existing todo", async () => {});
  it("should delete a todo", async () => {});
  it("should mark todo as done/pending", async () => {});
});

afterEach(async () => {
  // close the server
  await app.close();
});

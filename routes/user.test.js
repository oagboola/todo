const request = require("supertest");
const app = require("../server.js");
const { User } = require("../models/index.js");
const { encryptPassword } = require("../controllers/user.js");

beforeEach(async () => {
  await User.destroy({ where: {}, force: true });
});

describe("User API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      name: "test user",
      email: "test@user.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body.name).toEqual("test user");
    expect(res.body.email).toEqual("test@user.com");
  });

  it("should not register user with duplicate email", async () => {
    await User.create({
      name: "test user",
      email: "test@user.com",
      password: "password",
    });
    const res = await request(app).post("/users/register").send({
      name: "test user",
      email: "test@user.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBe("email must be unique");
    expect(res.body.status).toBe("error");
  });

  it("should log in existing user", async () => {
    const pwd = await encryptPassword("password");
    await User.create({
      name: "test user",
      email: "test@user.com",
      password: pwd,
    });
    const res = await request(app).post("/users/login").send({
      email: "test@user.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body.name).toEqual("test user");
    expect(res.body.email).toEqual("test@user.com");
  });

  it("should not log in user with wrong credentials", async () => {
    await User.create({
      name: "test user",
      email: "test@user.com",
      password: "pass",
    });
    const res = await request(app).post("/users/login").send({
      email: "test@user.com",
      password: "password",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe("Invalid credentials");
    expect(res.body.status).toBe("error");
  });
});

afterEach(async () => {
  // close the server
  await app.close();
});

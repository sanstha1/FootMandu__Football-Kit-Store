import bcrypt from "bcrypt";
import { authController } from "../../controller/index.js";
import { User } from "../../model/index.js";
import { generateToken } from "../../security/jwt-util.js";

jest.mock("../../model/index.js");
jest.mock("../../security/jwt-util.js");

describe("Authentication Controller", () => {
  const testUser = {
    userId: 1,
    name: "Santosh Shrestha",
    email: "sanstha@example.com",
    password: "hashedpassword",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash = jest.fn().mockResolvedValue("hashedpassword");
    User.create.mockResolvedValue({ ...testUser, password: "hashedpassword" });
    generateToken.mockReturnValue("mocked_token");

    const req = { body: { name: "Santosh Shrestha", email: "sanstha@example.com", password: "securepassword" } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await authController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      data: { access_token: "mocked_token" },
      message: "User successfully registered",
    });
  });

  it("should return 409 if user already exists", async () => {
    User.findOne.mockResolvedValue(testUser);

    const req = { body: { name: "Santosh Shrestha", email: "sthasantosh@gmail.com", password: "securepassword" } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await authController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({ message: "Email already exists" });
  });

  it("should log in a user with correct credentials", async () => {
    User.findOne.mockResolvedValue(testUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    generateToken.mockReturnValue("mocked_token");

    const req = { body: { email: "sthasantosh@gmail.com", password: "securepassword" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: { access_token: "mocked_token" },
      message: "Successfully logged in",
    });
  });

  it("should return 404 if user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    const req = { body: { email: "unknown@example.com", password: "password123" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 401 for incorrect password", async () => {
    User.findOne.mockResolvedValue(testUser);
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    const req = { body: { email: "sthasantosh@gmail.com", password: "wrongpassword" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});

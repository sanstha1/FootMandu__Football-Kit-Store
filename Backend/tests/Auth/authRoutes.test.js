import request from "supertest";
import express from "express";
import { authRouter } from "../../routes/authRoute.js";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Authentication API Endpoints", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/auth/create").send({
      name: "Santosh",
      email: "SAN@gmail.com",
      password: "securepassword123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User successfully registered");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "SAN@gmail.com",
      password: "securepassword123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Successfully logged in");
  });

  it("should return 404 for invalid login credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "invalid@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should reset a user's password", async () => {
    const res = await request(app).post("/auth/resetPassword").send({
      email: "SAN@gmail.com",
      newPassword: "newsecurepassword123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password successfully updated");
  });
});

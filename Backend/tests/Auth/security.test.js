import request from "supertest";
import express from "express";
import { authRouter } from "../../routes/authRoute.js";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Security Tests", () => {
  it("should prevent SQL Injection in login", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "' OR 1=1; --",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email and password are required");
  });

  it("should prevent SQL Injection in registration", async () => {
    const res = await request(app).post("/auth/create").send({
      name: "Santosh Shrestha",
      email: "' OR 1=1; --",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  it("should prevent unauthorized access to /init", async () => {
    const res = await request(app).get("/auth/init");

    expect(res.statusCode).toBe(401);
  });
});

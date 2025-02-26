import request from "supertest";
import express from "express";
import { productRouter } from "../../routes/productRoute.js";

const app = express();
app.use(express.json());
app.use("/products", productRouter);

describe("Security Tests", () => {
  it("should prevent SQL Injection", async () => {
    const res = await request(app).post("/products").send({
      name: "'; DROP TABLE products;--",
      contactNumber: "9800000000",
      productName: "Malicious Item",
      quantity: 10,
      price: 1000,
    });

    expect(res.statusCode).toBe(400);
  });

  it("should prevent unauthorized access to restricted routes", async () => {
    const res = await request(app).get("/admin");

    expect(res.statusCode).toBe(401);
  });
});

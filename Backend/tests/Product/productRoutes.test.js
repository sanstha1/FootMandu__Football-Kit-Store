import request from "supertest";
import express from "express";
import { productRouter } from "../../routes/productRoute.js";

const app = express();
app.use(express.json());
app.use("/products", productRouter);

describe("Product API Endpoints", () => {
  it("should create a product", async () => {
    const res = await request(app).post("/products").send({
      name: "San Stha",
      contactNumber: "9800000000",
      productName: "Boots",
      quantity: 3,
      price: 1800,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Product created successfully");
  });

  it("should retrieve all products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return 404 when retrieving a non-existent product", async () => {
    const res = await request(app).get("/products/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Product not found");
  });

  it("should delete a product", async () => {
    const res = await request(app).delete("/products/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product deleted successfully");
  });
});

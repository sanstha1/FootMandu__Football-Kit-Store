import { productController } from "../../controller/index.js";
import { Product } from "../../model/index.js";

jest.mock("../../model/index.js");

describe("Product Controller", () => {
  it("should get all products", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    Product.findAll.mockResolvedValue([{ id: 1, name: "Football" }]);

    await productController.getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: [{ id: 1, name: "Football" }],
      message: "Successfully fetched data",
    });
  });

  it("should create a new product", async () => {
    const req = { body: { name: "SanStha", contactNumber: "9800000000", productName: "Jersey", quantity: 5, price: 1500 } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    Product.create.mockResolvedValue(req.body);

    await productController.createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      data: req.body,
      message: "Product created successfully",
    });
  });

  it("should return 404 for non-existent product update", async () => {
    const req = { params: { id: 1 }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    Product.findOne.mockResolvedValue(null);

    await productController.updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Product not found" });
  });

  it("should delete an existing product", async () => {
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    Product.findOne.mockResolvedValue({ destroy: jest.fn() });

    await productController.deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "Product deleted successfully" });
  });
});

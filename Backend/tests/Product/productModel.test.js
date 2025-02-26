import { Product } from "../../model/index.js";

describe("Product Model", () => {
  it("should have the correct model properties", () => {
    expect(Product.rawAttributes).toHaveProperty("productId");
    expect(Product.rawAttributes).toHaveProperty("name");
    expect(Product.rawAttributes).toHaveProperty("contactNumber");
    expect(Product.rawAttributes).toHaveProperty("productName");
    expect(Product.rawAttributes).toHaveProperty("quantity");
    expect(Product.rawAttributes).toHaveProperty("price");
  });

  it("should set default quantity to 0", async () => {
    const product = await Product.build({
      name: "San Stha",
      contactNumber: "9800000000",
      productName: "Football",
      price: 2000,
    });

    expect(product.quantity).toBe(0);
  });

  it("should validate price as float", async () => {
    try {
      await Product.create({
        name: "San Stha",
        contactNumber: "9800000000",
        productName: "Jersey",
        quantity: 5,
        price: "invalidPrice",
      });
    } catch (error) {
      expect(error.errors[0].message).toBe("Validation isFloat on price failed");
    }
  });
});

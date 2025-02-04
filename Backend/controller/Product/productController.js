import { Product } from "../../model/index.js";

// Get all products
const getAllProducts = async (req, res) => {
  console.log("Get All Products");
  try {
    // Fetching all the products from the database
    const products = await Product.findAll();

    if (products.length === 0) {
      return res.status(200).send({ data: products, message: "Successfully fetched data" });
    }

    return res.status(200).send({ data: products, message: "Successfully fetched data" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error while fetching products" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { productName, quantity, price } = req.body;

    // Validation
    if (!productName || quantity === undefined || price === undefined) {
      return res.status(400).send({ message: "Invalid payload" });
    }

    const product = await Product.create({
      productName,
      quantity,
      price,
    });

    return res.status(201).send({ data: product, message: "Product created successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantity, price } = req.body;

    // Checking if product exists or not
    const existingProduct = await Product.findOne({ where: { productId: id } });

    if (!existingProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Update product fields
    existingProduct.productName = productName || existingProduct.productName;
    existingProduct.quantity = quantity !== undefined ? quantity : existingProduct.quantity;
    existingProduct.price = price !== undefined ? price : existingProduct.price;

    await existingProduct.save();

    return res.status(200).send({ data: existingProduct, message: "Product updated successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { productId: id } });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    await product.destroy();

    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { productId: id } });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Product fetched successfully", data: product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Save or create all products
const saveAllProducts = async (req, res) => {
  try {
    const { productId, productName, quantity, price } = req.body;

    const existingProduct = await Product.findOne({ where: { productId: productId } });

    if (existingProduct === null) {
      await Product.create(req.body);
      return res.status(201).json({ message: "Product added successfully" });
    }

    return res.status(409).json({ message: "Product already exists" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to save products" });
  }
};

export const productController = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  saveAllProducts,
};

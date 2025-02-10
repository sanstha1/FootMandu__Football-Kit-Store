import { Cart } from "../../model/index.js";

// Get all cart items
const getAllCartItems = async (req, res) => {
  console.log("Get All Cart Items");
  try {
    // Fetching all the cart items from the database
    const cartItems = await Cart.findAll();
    if (cartItems.length === 0) {
      return res.status(200).send({ data: cartItems, message: "No cart items found" });
    }
    return res.status(200).send({ data: cartItems, message: "Successfully fetched cart items" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error while fetching cart items" });
  }
};

// Create a new cart item
const createCartItem = async (req, res) => {
  try {
    const { productName, quantity, price } = req.body;

    if (!productName || quantity === undefined || price === undefined) {
      return res.status(400).send({ message: "Invalid payload. Missing required fields." });
    }

    const cartItem = await Cart.create({
      productName,
      quantity,
      price,
    });

    return res.status(201).send({ data: cartItem, message: "Cart item created successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to create cart item" });
  }
};

// Update an existing cart item
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantity, price } = req.body;

    const existingCartItem = await Cart.findOne({ where: { cartId: id } });
    if (!existingCartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    existingCartItem.productName = productName || existingCartItem.productName;
    existingCartItem.quantity = quantity !== undefined ? quantity : existingCartItem.quantity;
    existingCartItem.price = price !== undefined ? price : existingCartItem.price;

    await existingCartItem.save();
    return res.status(200).send({ data: existingCartItem, message: "Cart item updated successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Delete a cart item by ID
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findOne({ where: { cartId: id } });
    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    await cartItem.destroy();
    return res.status(200).send({ message: "Cart item deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to delete cart item" });
  }
};

// Get cart item by ID
const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findOne({ where: { cartId: id } });
    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }
    return res.status(200).send({ message: "Cart item fetched successfully", data: cartItem });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to fetch cart item" });
  }
};

// Save or create a cart item
const saveCartItem = async (req, res) => {
  try {
    const { cartId, productName, quantity, price } = req.body;
    const existingCartItem = await Cart.findOne({ where: { cartId: cartId } });
    if (existingCartItem === null) {
      await Cart.create(req.body);
      return res.status(201).json({ message: "Cart item added successfully" });
    }
    return res.status(409).json({ message: "Cart item already exists" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to save cart item" });
  }
};

export const cartController = {
  getAllCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getCartItemById,
  saveCartItem,
};
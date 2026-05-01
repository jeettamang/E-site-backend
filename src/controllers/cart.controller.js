import { CartModel } from "../models/cart.model.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
        });
      }
    }
    await cart.save();
    res.status(200).json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId",
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    item.quantity = quantity;
    await cart.save();
    const updatedCart = await CartModel.findOne({ userId }).populate(
      "items.productId",
    );
    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    await cart.save();
    const updatedCart = await CartModel.findOne({ userId }).populate(
      "items.productId",
    );
    res.status(200).json({ message: "Item removed", cart: updatedCart });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
export { addToCart, getCart, updateCartItem, removeCartItem };

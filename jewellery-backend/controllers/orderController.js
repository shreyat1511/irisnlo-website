import Order from "../models/orderModel.js";

// @desc  Get all orders (admin only)
// @route GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders.", error: error.message });
  }
};

// @desc  Get single order
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order.", error: error.message });
  }
};

// @desc  Place a new order
// @route POST /api/orders
export const createOrder = async (req, res) => {
  const { customerName, customerEmail, products, totalAmount } = req.body;

  if (!customerName || !customerEmail || !products?.length || !totalAmount) {
    return res.status(400).json({ message: "Please provide all required order details." });
  }

  try {
    const order = await Order.create({ customerName, customerEmail, products, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order.", error: error.message });
  }
};

// @desc  Update order status (admin only)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status.", error: error.message });
  }
};

// @desc  Track orders by customer email (public)
// @route GET /api/orders/track?email=
export const trackOrderByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email address." });
  }

  try {
    const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to track orders.", error: error.message });
  }
};


// @route DELETE /api/orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });

    await order.deleteOne();
    res.json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order.", error: error.message });
  }
};
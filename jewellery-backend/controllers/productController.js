import Product from "../models/productModel.js";

// @desc  Get all products
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products.", error: error.message });
  }
};

// @desc  Get single product
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product.", error: error.message });
  }
};

// @desc  Add a new product (admin only)
// @route POST /api/products
export const addProduct = async (req, res) => {
  const { name, description, price, image, status } = req.body;

  try {
    const product = await Product.create({ name, description, price, image, status });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to add product.", error: error.message });
  }
};

// @desc  Update a product (admin only)
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product.", error: error.message });
  }
};

// @desc  Delete a product (admin only)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product.", error: error.message });
  }
};
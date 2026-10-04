const Product = require("../models/Product");

// GET all (optional: ?active=true)
exports.getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active) {
      filter.active = req.query.active === "true";
    }
    const products = await Product.find(filter).select("-__v");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// POST create
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// DELETE one
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

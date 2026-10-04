const express = require("express");
const { getProducts, createProduct, deleteProduct } = require("../controllers/productController");
const auth = require("../middleware/auth");
const router = express.Router();

// Every product route needs a login
router.use(auth);

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

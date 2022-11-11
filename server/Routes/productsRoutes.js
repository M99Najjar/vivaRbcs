const express = require("express");
const router = express.Router();

const {
  getProduct,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productsController");
const { isLogedin } = require("../middlewares/isLogedin");

router.get("/", getProducts);
router.get("/:product_id", getProduct);
router.post("/", addProduct);
router.delete("/:product_id", deleteProduct);
router.patch("/:product_id", updateProduct);

module.exports = router;

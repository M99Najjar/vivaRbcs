const pool = require("../db");
const { Products } = require("../models/product");

/*get single product*/
const getProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Products.find.byId(product_id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*get all products*/
const getProducts = async (req, res) => {
  try {
    const products = await Products.find.all();
    res.status(200).json(products);
  } catch (error) {
    res.json(error.message);
  }
};

/*add product*/
const addProduct = async (req, res) => {
  const { product_name, description } = req.body;
  const user_id = 1;

  try {
    const products = await Products.create({
      product_name,
      description,
      user_id,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*delete product*/
const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    await Products.delete(product_id);
    res.json({ status: "done" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*update product*/
const updateProduct = async (req, res) => {
  const { product_id } = req.params;
  const { product_name, description } = req.body;
  const user_id = 1;

  try {
    await Products.update({ product_name, description, user_id, product_id });
    res.json({ status: "done" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};

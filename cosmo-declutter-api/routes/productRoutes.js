const router = require("express").Router();
const Product = require("../models/products");
const {user} = require("../middlewares/auth");
const upload = require("../middlewares/imageUpload");
const { productValidator } = require("../middlewares/validator");
const { body, validationResult } = require("express-validator");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);

router.get("/:id",
  productController.getProductById
);

router.post(
  "/",
  user,
  upload.single("image"),
  productValidator,
  productController.registerProduct
);

module.exports = router;

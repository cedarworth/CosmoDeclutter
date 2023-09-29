const router = require("express").Router();
const Product = require("../models/products");
const upload = require("../middlewares/imageUpload");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/products/:_id", (req, res) => {
//   res.json(res.product);
// });

router.post(
  "/addProduct",
  [
    body("name")
      .exists()
      .withMessage("Product Name is a required field")
      .isLength({ min: 3 })
      .withMessage("Product Name must be at least 3 characters"),
    body("price")
      .exists()
      .withMessage("Price is a required field")
      .isLength({ min: 3 })
      .withMessage("Price must be at least 3 characters"),
    body("description")
      .exists()
      .withMessage("Description is a required field")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 8 characters"),
    body("Location")
      .exists()
      .isLength({ min: 3 })
      .withMessage("Location confirmation is required"),
  ],
  upload.single("image"),
  async (req, res) => {
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      imgLink: req.file.filename,
      description: req.body.description,
      location: req.body.location,
    });

    // console.log(product);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
          }
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;

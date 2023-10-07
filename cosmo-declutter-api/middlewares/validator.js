const { check, validationResult } = require('express-validator');

exports.productValidator = [
  check("name")
    .exists()
    .withMessage("Product Name is a required field")
    .isLength({ min: 3 })
    .withMessage("Product Name must be at least 3 characters"),
  check("price")
    .exists()
    .withMessage("Price is a required field")
    .isLength({ min: 3 })
    .withMessage("Price must be at least 3 characters"),
  check("description")
    .exists()
    .withMessage("Description is a required field")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 8 characters"),
  check("location")
    .exists()
    .isLength({ min: 3 })
    .withMessage("Location confirmation is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }
    next();
  },
];
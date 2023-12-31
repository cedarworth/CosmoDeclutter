const router = require("express").Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { user } = require("../middlewares/auth");

router.post(
  "/register",
  [
    body("firstName")
      .exists()
      .withMessage("Firstname is a required field")
      .isLength({ min: 3 })
      .withMessage("FirstName must be at least 3 characters"),
    body("lastName")
      .exists()
      .withMessage("Lastname is a required field")
      .isLength({ min: 3 })
      .withMessage("LastName must be at least 3 characters"),
    body("email")
      .exists()
      .withMessage("Email is a required field")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .exists()
      .withMessage("password is a required field")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),
    body("confirmPassword")
      .exists()
      .withMessage("password confirmation is required")
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Password confirmation must match the password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const foundUser = await User.findOne({ email: req.body.email });
      if (!!foundUser) {
        return res.status(409).json({
          message: "Email already in use",
        });
      }

      console.log(req.body);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });

      await newUser.save();





      
      console.log(newUser);
      res.status(201).json({
        message: "Account created successfully"
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }
  const passwordIsValid = await foundUser.isValidPassword(password);
  if (!passwordIsValid) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }

  const authUser = {
    id: foundUser._id,
    email: foundUser.email,
    name: foundUser.firstName,
  };

  const token = jwt.sign(authUser, process.env.SECRET_JWT_KEY, {
    expiresIn: "1d",
  });

  res.json({ user: authUser, token });
});

router.get("/user", user,  async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

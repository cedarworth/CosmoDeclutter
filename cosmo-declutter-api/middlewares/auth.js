const User = require("../models/user");
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.SECRET_JWT_KEY;


const user = async (req, res, next) => {
    const token = req.get("Authorization")?.split(" ")[1] || "";
    try {
        req.user = jwt.verify(token, jwtSecret)
        next()
    } catch (err) {
        res.status(403).json({
            status: "error",
            message: "Authorization is required"
        })
    }
}


module.exports = {user}
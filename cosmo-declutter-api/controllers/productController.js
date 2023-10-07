const Product = require('../models/products');

exports.registerProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      imgLink: req.file.filename,
      description: req.body.description,
      location: req.body.location,
    });
    console.log(newProduct)
    
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products.map(product => ({
      ...product._doc,
      imgLink: `${req.protocol}://${req.headers.host}/uploads/${product.imgLink}`, 
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      ...product._doc,
      imgLink: `${req.protocol}://${req.headers.host}/uploads/${product.imgLink}`, 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

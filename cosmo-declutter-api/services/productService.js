const Product = require('../models/product'); // import the Product mongoose model

class ProductService {
    static async createProduct(product) {
        const newProduct = new Product(product);
        await newProduct.save();
        return newProduct;
    }
    static async updateProduct(id, product) {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true
        });
        return updatedProduct;
    }
    static async deleteProduct(id) {
        const deletedProduct = await Product.findByIdAndRemove(id);
        return deletedProduct;
    }
    static async getProducts() {
        return await Product.find();
    }
    static async getProduct(id) {
        return await Product.findById(id);
    }
}

module.exports = ProductService;
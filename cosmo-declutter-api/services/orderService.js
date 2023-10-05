const Order = require("../models/order"); // import the Order mongoose model

class OrderService {
    static async createOrder(order) {
        const newOrder = new Order(order);
        await newOrder.save();
        return newOrder;
    }
    static async updateOrder(id, order) {
        const updatedOrder = await Order.findByIdAndUpdate(id, order, {
            new: true
        });
        return updatedOrder;
    }
    static async deleteOrder(id) {
        const deletedOrder = await Order.findByIdAndRemove(id);
        return deletedOrder;
    }
    static async getOrders() {
        return await Order.find();
    }
    static async getOrder(id) {
        return await Order.findById(id);
    }
}

module.exports = OrderService;
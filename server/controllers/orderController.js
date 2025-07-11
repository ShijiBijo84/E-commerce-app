
import asyncError from "../middlewares/asyncError.js";
import Order from "../models/orderModel.js";
import Product from "../models/ProductModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//New order -/api/v1/order/new
// eslint-disable-next-line no-unused-vars
export const newOrder = asyncError(async (req, res, next) => {
    const { orderItems,
        shippingInfo,
        shippingPrice,
        itemsPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        shippingPrice,
        itemsPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({ success: true, order })
})

//Get specific order -/api/v1/order/:id
export const getOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }
    res.status(200).json({ success: true, order })
})

//Get my orders -/api/v1/myorders
// eslint-disable-next-line no-unused-vars
export const myOrders = asyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json({ success: true, orders })
})

//Get orders for Admin - /api/v1/admin/orders
// eslint-disable-next-line no-unused-vars
export const orders = asyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice)
    res.status(200).json({ success: true, orders, totalAmount })
})

//Admin: update order -/api/v1/admin/order/:id
export const updateOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order already delivered', 402))
    }
    //Updating stock of product
    order.orderItems.forEach(async item => await updateStock(item.product, item.quantity))
    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now()
    await order.save()
    res.status(200).json({ success: true, order })
})

//Admin: Delete order - /api/v1/admin/order/:id
export const deleteOrder = async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('Order does not exist', 402))
    }
    await Order.findByIdAndDelete(req.params.id)
    return res.status(200).json({ success: true, message: 'Order deleted' })
}

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity
    await product.save({ validateBeforeSave: false })
}
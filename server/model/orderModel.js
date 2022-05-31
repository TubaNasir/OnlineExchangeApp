const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        buyerID: {
            type: String,
            required: true,
        },
        sellerID: {
            type: String,
            required: true,
        },
        item: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum:['placed', 'dispatched' ,'delivered'],
            default: "placed"
        }
    },
    //other possible values could be: is_paid, paid_at, is_delivered, delivered_at... should be added
    {
        timestamps: true
    }
);

module.exports = mongoose.model('order', orderSchema, 'order');
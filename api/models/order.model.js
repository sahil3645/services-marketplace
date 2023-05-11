import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new Schema({
    gigId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    payment_intent: {
        type: String,
        required: true,
    },
    sellerUsername: {
        type: String,
        required: true,
    },
    buyerUsername: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Active" // Active/In Progress or Completed
    },
    acceptedByBuyer: { // if true then delivery is accepted and order is completed 
        type: Boolean,
        default: false,
    },
    deliveredBySeller: {
        type: Boolean,
        default: false,
    },
    deliveryStatus: { // as in "Accepted" or "Delivered" or "Not Delivered"
        type: String,
        default: "Not Delivered",
    },
    date: {
        type: String,
    }
}, {
    timestamps: true
});

export default mongoose.model("Order", OrderSchema);
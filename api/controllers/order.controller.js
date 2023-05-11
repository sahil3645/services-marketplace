import createError from "../utils/createError.js";
import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"
import Stripe from "stripe"
import User from "../models/user.model.js"

export const intent = async (req, res, next) => {

    // console.log("req params id:", req.params.id);
    // getting user info
    const { username: buyerUsername } = await User.findById(req.userId);
    const { username: sellerUsername } = await Gig.findById(req.params.id);

    const stripe = new Stripe(process.env.STRIPE);

    const gig = await Gig.findById(req.params.id);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
        sellerUsername: sellerUsername,
        buyerUsername: buyerUsername,
    });

    // console.log("first time when order gets created:", paymentIntent.id);
    await newOrder.save();

    res.status(200).send({
        clientsecret: paymentIntent.client_secret,
    });
}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isConfirmed: true,
        });

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
}

export const confirm = async (req, res, next) => {

    // console.log("from body:", req.body.payment_intent);

    try {

        const order = await Order.findOneAndUpdate({
            payment_intent: req.body.payment_intent
        }, {
            $set: {
                isConfirmed: true,
                date: new Date(),
            },
        }, {
            new: true,
        })
        const gigId = order.gigId;
        await order.save();

        // increment sales
        const gig = await Gig.findOneAndUpdate({
            _id: gigId,
        }, {
            $inc: {
                sales: 1,
            }
        }, {
            new: true,
        });

        await gig.save();

        res.status(200).send("Order has been confirmed");
    } catch (err) {
        next(err);
    }
}


export const deliverOrder = async (req, res, next) => {

    try {
        const { id } = req.params;

        const order = await Order.findOneAndUpdate({
            _id: id,
        }, {
            $set: {
                deliveredBySeller: true,
                deliveryStatus: "Delivered",
            }
        })
        res.status(201).send("Order has been Delivered");
    } catch (error) {
        next(error);
    }
}


export const acceptDelivery = async (req, res, next) => {

    try {
        const { id } = req.params;

        const order = await Order.findOneAndUpdate({
            _id: id,
            deliveredBySeller: true,
            deliveryStatus: "Delivered",
        }, {
            $set: {
                acceptedByBuyer: true,
                deliveryStatus: "Accepted",
                status: "Completed"
            }
        })

        if (!order) {
            return res.status(404).send("Order not found or delivery not made by seller yet");
        }

        res.status(201).send("Order has been Delivered");
    } catch (error) {
        next(error);
    }
}


export const getOrder = async (req, res, next) => {

    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).send("Order not found!");
        }

        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}







// used earlier for testing
// export const createOrder = async (req, res, next) => {

//     const { username: buyerUsername } = await User.findById(req.userId);
//     const { username: sellerUsername } = await Gig.findById(req.params.gigId);

//     try {
//         const gig = await Gig.findById(req.params.gigId);

//         const newOrder = new Order({
//             gigId: gig._id,
//             img: gig.cover,
//             title: gig.title,
//             buyerId: req.userId,
//             sellerId: gig.userId,
//             price: gig.price,
//             payment_intent: "temporary",
//             sellerUsername: sellerUsername,
//             buyerUsername: buyerUsername,
//         });

//         await newOrder.save();
//         res.status(200).send("successful");
//     } catch (err) {
//         next(err);
//     }
// }
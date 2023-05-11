import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js"
import User from "../models/user.model.js"

export const createConversation = async (req, res, next) => {

    const { username } = await User.findOne({ _id: req.body.to })

    // console.log(username);
    // console.log(req.body.sellerUsername);
    // console.log(req.body.buyerUsername);

    const newConversation = new Conversation({
        id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
        sellerUsername: req.isSeller ? req.body.sellerUsername : username,
        buyerUsername: req.isSeller ? username : req.body.buyerUsername,
    });

    try {
        const savedConversation = await newConversation.save();

        res.status(201).send(savedConversation);
    } catch (err) {
        next(err);
    }
}

export const updateConversation = async (req, res, next) => {

    try {
        const updatedConversation = await Conversation.findOneAndUpdate(
            { id: req.params.id },
            {
                $set: {
                    // readBySeller: true,
                    // readByBuyer: true
                    ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
                },
            },
            { new: true }
        );

        res.status(200).send(updateConversation);
    } catch (err) {
        next(err);
    }
}

export const getSingleConversation = async (req, res, next) => {

    try {
        const conversation = await Conversation.findOne({ id: req.params.id })
        if (!conversation) return next(createError(404, "Not found"));
        res.status(200).send(conversation);
    } catch (err) {
        next(err);
    }
}
export const getConversations = async (req, res, next) => {

    try {
        const conversations = await Conversation.find(
            req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
        ).sort({ updatedAt: -1 })

        res.status(200).send(conversations);
    } catch (err) {
        next(err);
    }
}
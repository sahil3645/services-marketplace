import User from "../models/user.model.js"
import Order from "../models/order.model.js"
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt"

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
}

export const getUsers = async (req, res, next) => {
    // console.log("getUsers called");
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        // res.send(err);
        next(createError(404, "Users not found!"));
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
};

export const blockUser = async (req, res, next) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        user.isBlocked = !user.isBlocked;

        user.status = user.isBlocked ? "Blocked" : "Active";

        await user.save();
        res.status(201).send(`User is ${user.isBlocked ? "blocked" : "unblocked"} successfully!`);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ _id: id });

        if (!deletedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted successfully');
    } catch (error) {
        next(error);
    }
}

export const getOrders = async (req, res, next) => {
    // console.log("getOrders called");
    try {
        const orders = await Order.find();

        if (!orders) return next(createError(404, "Orders not found!"));

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
}
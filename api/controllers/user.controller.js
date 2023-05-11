import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt"

export const deleteUser = async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
        return next(createError(403, "You can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted!");
}

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
}


// NEW
export const getUsers = async (req, res, next) => {
    const users = await User.find();

    try {
        res.status(200).send(users);
    } catch (err) {
        // res.send(err);
        next(createError(404, "Users not found!"));
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { email, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email === user.email) return next(createError(403, "Its already your current email. Enter a different email"));

        const usedEmail = await User.findOne({ email: email });
        if (usedEmail) return next(createError(409, "User with this email already exists!"));

        if (req.userId !== user._id.toString()) {
            return next(createError(403, 'You can update only your account!'));
        }

        const isCorrect = bcrypt.compareSync(currentPassword, user.password);
        if (!isCorrect) return next(createError(404, "Wrong password!"));


        if (email) {
            user.email = email;
        }
        if (newPassword) {
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            user.password = hashedPassword;
        }
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSellerInfo = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    const sendUser = {
        username: user.username,
        _id: user._id,
        img: user.img,
        country: user.country,
        isSeller: user.isSeller,
    }

    res.status(200).send(sendUser);
}
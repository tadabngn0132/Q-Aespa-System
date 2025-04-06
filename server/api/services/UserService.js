const mongoose = require("mongoose");
const User = mongoose.model('User');
require('../models/QuestionModel');
const Question = mongoose.model('Question');
require('../models/AnswerModel');
const Answer = mongoose.model('Answer');
const authService = require('./AuthService');

const userService = {
    getUsers: async () => {
        return await User.find({})
        .select('-password');
    },
    deleteUser: async (userId) => {
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            throw new Error('User not found!');
        }

        await User.deleteOne({ _id: userId });
        await Question.deleteMany({userId: userId})
        await Answer.deleteMany({userId: userId})
        return userId;
    },
    getUser: async (userId) => {
        const foundUser = await User.findById(userId).select('-password');

        if (!foundUser) {
            throw new Error('User not found!');
        }

        return foundUser;
    },
    createUser: async (userData) => {
        const existingUser = await User.findOne({ email: userData.email });

        if (!existingUser) {
            const hashedPassword = await authService.hashPassword(userData.password);
            const newUser = new User({
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            });
            const savedUser = await newUser.save();
            return await User.findById(savedUser._id).select('-password');
        } else {
            throw new Error('User already exists.');
        }
    },
    updateUser: async (userId, userData) => {
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            throw new Error('User not found');
        }

        const updateData = {
            name: userData.name,
            email: userData.email,
            role: userData.role
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    },
    searchUser: async (keyword) => {
        let foundUsers = await User.find(
            { "name": {"$regex": keyword, "$options": "i" }}
        );

        return foundUsers;
    }
}

module.exports = userService;
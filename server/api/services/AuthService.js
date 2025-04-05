const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const emailService = require('./EmailService');
const { generateRandomPassword } = require('../utils/PasswordUtils');

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'fallback-secret-key';

exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

exports.comparePassword = async (enteredPassword, storedPassword) => {
    try {
        return await bcrypt.compare(enteredPassword, storedPassword);
    } catch (error) {
        throw new Error('Error comparing password');
    }
};

exports.registerUser = async (userData) => {
    const { name, email, password, role } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'student'
    });

    await newUser.save();

    try {
        await emailService.sendWelcomeEmail(email, name);
    } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
    }

    return newUser;
}

exports.loginUser = async (email, enteredPassword) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(enteredPassword, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

    return {
        token,
        userId: user._id,
        role: user.role,
        user: {
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    };
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found!');
    }
    
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
        throw new Error('Wrong current password!');
    }

    const hashedNewPassword = await this.hashPassword(newPassword);

    const updateData = {
        password: hashedNewPassword
    }

    return await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
    ).select('-password');
};

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });
        
    if (!user) {
        throw new Error('User not found');
    }
    
    const newPassword = generateRandomPassword();
    
    const hashedPassword = await this.hashPassword(newPassword);
    
    user.password = hashedPassword;
    await user.save();
    
    await emailService.sendPasswordReset(user.email, user.name, newPassword);
};

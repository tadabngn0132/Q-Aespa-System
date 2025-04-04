const AuthService = require('../services/AuthService');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = await AuthService.registerUser(req.body);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: error.message })
        }
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const authResult = await AuthService.loginUser(email, password);

        res.json({
            success: true,
            message: 'Login successful',
            token: authResult.token,
            userId: authResult.userId,
            user: authResult.user
        });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid credentials') {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(500).json({
            success: false, 
            message: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;

        const updatedUser = await AuthService.changePassword(userId, currentPassword, newPassword);

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error changing password:', error);

        if (error.message === 'User not found!') {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        if (error.message === 'Wrong current password!') {
            return res.status(401).json({ 
                success: false, 
                message: 'Current password is incorrect' 
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to change password',
            error: error.message
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            await AuthService.forgotPassword(email);
        } catch (error) {
            if (error.message !== 'User not found') {
                console.error('Error in password reset:', error);
            }
        }

        return res.status(200).json({ 
            message: 'If your email exists in our system, you will receive a password reset email shortly.' 
        });
        
    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};
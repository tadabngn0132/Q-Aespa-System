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
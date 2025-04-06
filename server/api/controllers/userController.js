const userService = require('../services/UserService');

exports.list_all_users = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message })
    }
};

exports.delete_a_user = async (req, res) => {
    try {
        const userId = await userService.deleteUser(req.params.userId)
        res.json({
            message: 'User deleted successfully!',
            _id: userId
        });
    } catch(err) {
        res.status(404).send({ message: err.message });
    }
};

exports.read_a_user = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.userId);
        res.json(user);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};

exports.create_a_user = async (req, res) => {
    try {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
};

exports.update_a_user = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await userService.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.search_users = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const foundUsers = await userService.searchUser(keyword);
        res.json(foundUsers);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}
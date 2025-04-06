const AuthBuilder = require('../controllers/AuthController');
const UserBuilder = require('../controllers/userController');
module.exports = app => {
    app
        .route('/register')
        .post(AuthBuilder.createUser);
    app
        .route('/login')
        .post(AuthBuilder.loginUser);
    app
        .route('/changepassword/:userId')
        .put(AuthBuilder.changePassword)
    app 
        .route('/users')
        .get(UserBuilder.list_all_users)
        .post(UserBuilder.create_a_user);
    app
        .route('/users/search')
        .get(UserBuilder.search_users);
    app
        .route('/users/:userId')
        .get(UserBuilder.read_a_user)
        .put(UserBuilder.update_a_user)
        .delete(UserBuilder.delete_a_user);
    app
        .route('/forgot-password')
        .post(AuthBuilder.forgotPassword);
};
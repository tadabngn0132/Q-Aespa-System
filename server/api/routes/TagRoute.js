const tagBuilder = require('../controllers/TagController');

module.exports = app => {
    app
        .route('/tags')
        .get(tagBuilder.list_all_tags)
        .post(tagBuilder.create_a_tag);
    app
        .route('/tags/:tagId')
        .get(tagBuilder.read_a_tag)
        .put(tagBuilder.update_a_tag)
        .delete(tagBuilder.delete_a_tag);
};
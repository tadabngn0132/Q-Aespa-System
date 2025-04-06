const tagBuilder = require('../controllers/TagController');

module.exports = app => {
    app
        .route('/tags/sort')
        .get((req, res) => {
            if (req.query.sort === 'name') {
                tagBuilder.list_all_tags_by_name(req, res);
            } else if (req.query.sort === 'popular') {
                tagBuilder.list_all_tags_by_question_count(req, res);
            }
        });
    app
        .route('/tags')
        .get(tagBuilder.list_all_tags)
        .post(tagBuilder.create_a_tag);
    app 
        .route('/tags/search')
        .get(tagBuilder.read_a_tag_by_tag_name);
    app
        .route('/tags/:tagId')
        .get(tagBuilder.read_a_tag)
        .put(tagBuilder.update_a_tag)
        .delete(tagBuilder.delete_a_tag);
};
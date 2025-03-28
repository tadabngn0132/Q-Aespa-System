const questionBuilder = require('../controllers/QuestionController');

module.exports = app => {
    app
        .route('/questions')
        .get(questionBuilder.list_all_questions)
        .post(questionBuilder.create_a_question);
    app
        .route('/questions/bytag/:tagId')
        .get(questionBuilder.list_questions_by_tag_id);
    app
        .route('/users/:userId/questions')
        .get(questionBuilder.list_questions_by_user_id);
    app
        .route('/questions/:questionId')
        .get(questionBuilder.read_a_question)
        .put(questionBuilder.update_a_question)
        .delete(questionBuilder.delete_a_question);
};
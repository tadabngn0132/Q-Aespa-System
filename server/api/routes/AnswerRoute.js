const AnswerBuilder = require('../controllers/AnswerController');

module.exports = app => {
    app
        .route('/answers')
        .get(AnswerBuilder.list_all_answers)
    app
        .route('/questions/:questionId/answers')
        .get(AnswerBuilder.listAllAnswersOfQuestion)
        .post(AnswerBuilder.createAnAnswer);
    app
        .route('/questions/:questionId/answers/:answerId')
        .get(AnswerBuilder.readAnAnswer)
        .put(AnswerBuilder.updateAnAnswer)
        .delete(AnswerBuilder.deleteAnAnswer);
    app
        .route('/users/:userId/answers')
        .get(AnswerBuilder.listAnswersByUserId);
};
const questionService = require('../services/QuestionService');

exports.list_all_questions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const questions = await questionService.getAllQuestions(page, limit);
        res.json(questions);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.list_questions_by_tag_id = async (req, res) => {
    try {
        const tagId = req.params.tagId;

        if (!tagId) {
            return res.status(400).send({ message: 'Tag ID is required'});
        }

        const questions = await questionService.getQuestionsByTagId(tagId);
        res.json(questions);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.create_a_question = async (req, res) => {
    try {
        const question = await questionService.createQuestion(req.body);
        res.json(question);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.read_a_question = async (req, res) => {
    try {
        const question = await questionService.getQuestionById(req.params.questionId);
        res.json(question);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};

exports.update_a_question = async (req, res) => {
    try {
        const question = await questionService.updateQuestion(req.params.questionId, req.body);
        res.json(question);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.delete_a_question = async (req, res) => {
    try {
        const questionId = await questionService.deleteQuestion(req.params.questionId);
        res.json({
            message: 'Question successfully deleted',
            _id: questionId
        });
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};


// Thêm vào questionController.js

exports.search_questions = async (req, res) => {
try {
    const keyword = req.query.keyword;
    const questions = await questionService.searchQuestionsByKeyword(keyword);
    res.json(questions);
    } catch (err) {
    res.status(500).send({ message: err.message });
    }
};

exports.get_questions_by_tag = async (req, res) => {
    try {
    const tag = req.params.tag;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const questions = await questionService.getQuestionsByTag(tag, page, limit);
    res.json(questions);
    } catch (err) {
    res.status(500).send({ message: err.message });
    }
};

exports.get_questions_by_title = async (req, res) => {
    try {
    const titleQuery = req.query.title;
    const questions = await questionService.getQuestionsByTitle(titleQuery);
    res.json(questions);
    } catch (err) {
    res.status(500).send({ message: err.message });
    }
};
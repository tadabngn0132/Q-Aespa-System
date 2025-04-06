const questionService = require('../services/QuestionService');

exports.list_all_questions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions();
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

exports.list_questions_by_user_id = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }

        const questions = await questionService.getQuestionByUserId(userId);
        res.json(questions);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

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

exports.search_questions = async (req, res) => {
try {
    const { keyword } = req.query;
    const questions = await questionService.searchQuestionsByKeyword(keyword);
    res.json(questions);
    } catch (err) {
    res.status(500).send({ message: err.message });
    }
};

exports.list_all_questions_asc = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestionsAsc();
        res.json(questions);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.list_all_unanswered_questions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestionsUnanswered();
        res.json(questions);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.list_all_questions_by_score = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestionsByScore();
        res.json(questions);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.countQuestionByTagId = async (req, res) => {
    try {
        const questionQuantity = await questionService.countQuestionByTag(req.params.tagId);
        res.json(questionQuantity);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

exports.search_questions_by_exact = async (req, res) => {
    try {
        const { keyword } = req.query;
        const questions = await questionService.searchQuestionsByExactKeyword(keyword);
        res.json(questions);
    } catch (err) {
    res.status(500).send({ message: err.message });
    }
};
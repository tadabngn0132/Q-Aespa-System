const answerService = require('../services/AnswerService');

const answerController = {
    list_all_answers: async (req, res) => {
        try {
            const answers = await answerService.getAnswers();
            res.json(answers);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },

    listAllAnswersOfQuestion: async (req, res) => {
        try {
            const { questionId } = req.params;

            const answers = await answerService.getAnswersByQuestionId(questionId);
            
            return res.status(200).json(answers);
        } catch (error) {
            console.error('Error getting answers:', error);
            return res.status(error.status || 500).json({ 
                success: false, 
                message: error.message || 'Internal server error' 
            });
        }
    },

    listAnswersByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const answers = await answerService.getAnswersByUserId(userId);
            return res.status(200).json(answers);
        } catch (error) {
            console.error('Error getting user answers:', error);
            return res.status(error.status || 500).json({ 
                success: false, 
                message: error.message || 'Internal server error' 
            });
        }
    },

    readAnAnswer: async (req, res) => {
        try {
            const { answerId } = req.params;
            const answer = await answerService.getAnswerById(answerId);

            return res.status(200).json(answer);
        } catch (error) {
            console.error('Error getting answer:', error);
            return res.status(error.status || 404).json({ 
                success: false, 
                message: error.message || 'Answer not found' 
            });
        }
    },

    createAnAnswer: async (req, res) => {
        try {
            const { questionId } = req.params;

            const answerData = {
                ...req.body,
                questionId
            };

            const newAnswer = await answerService.createAnswer(answerData);

            return res.status(201).json(newAnswer);
        } catch (error) {
            console.error('Error creating answer:', error);
            return res.status(error.status || 400).json({
                success: false,
                message: error.message || 'Bad request'
            });
        }
    },

    updateAnAnswer: async (req, res) => {
        try {
            const { answerId } = req.params;
            const answerData = req.body;

            if (answerData.questionId) {
                delete answerData.questionId;
            }

            const updatedAnswer = await answerService.updateAnswer(answerId, answerData);

            return res.status(200).json(updatedAnswer);
        } catch (error) {
            console.error('Error updating answer:', error);
            return res.status(error.status || 400).json({ 
                success: false, 
                message: error.message || 'Bad request' 
            });
        }
    },

    deleteAnAnswer: async (req, res) => {
        try {
            const { answerId } = req.params;
            const deletedId = await answerService.deleteAnswer(answerId);

            return res.status(200).json({
                success: true,
                message: 'Answer deleted successfully',
                _id: deletedId
            });
        } catch (error) {
            console.error('Error deleting answer:', error);
            return res.status(error.status || 400).json({
                success: false,
                message: error.message || 'Bad request'
            });
        }
    }
};

module.exports = answerController;
const answerService = require('../services/AnswerService');

const answerController = {
    listAllAnswersOfQuestion: async (req, res) => {
        try {
            const { questionId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const answers = await answerService.getAnswersByQuestionId(questionId, page, limit);
            
            // Trả về trực tiếp mảng answers thay vì đóng gói trong data.answers
            return res.status(200).json(answers);
        } catch (error) {
            console.error('Error getting answers:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    readAnAnswer: async (req, res) => {
        try {
            const { answerId } = req.params;
            const answer = await answerService.getAnswerById(answerId);

            // Trả về trực tiếp đối tượng answer
            return res.status(200).json(answer);
        } catch (error) {
            console.error('Error getting answer:', error);
            return res.status(404).json({ success: false, message: error.message});
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

            // Trả về trực tiếp đối tượng answer mới
            return res.status(201).json(newAnswer);
        } catch (error) {
            console.error('Error creating answer:', error);
            return res.status(400).json({
                success: false,
                message: error.message
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

            // Trả về trực tiếp đối tượng answer đã cập nhật
            return res.status(200).json(updatedAnswer);
        } catch (error) {
            console.error('Error updating answer:', error);
            return res.status(400).json({ success: false, message: error.message});
        }
    },

    deleteAnAnswer: async (req, res) => {
        try {
            const { answerId } = req.params;
            const deletedId = await answerService.deleteAnswer(answerId);

            // Trả về ID của answer đã xóa
            return res.status(200).json(deletedId);
        } catch (error) {
            console.error('Error deleting answer:', error);
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = answerController;
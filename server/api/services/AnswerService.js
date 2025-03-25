const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');

const answerService = {
    getAnswersByQuestionId: async (questionId, page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        return await Answer.find({ questionId: questionId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    },

    getAnswerById: async (answerId) => {
        const answer = await Answer.findById(answerId);
        if(!answer) {
            throw new Error('Answer not found');
        }
        return answer;
    },

    countAnswerByQuestionId: async (questionId) => {
        return await Answer.countDocuments({ questionId });
    },

    createAnswer: async (answerData) => {
        const newAnswer = new Answer(answerData);
        return await newAnswer.save();
    },

    updateAnswer: async (answerId, answerData) => {
        const existingAnswer = await Answer.findById(answerId);
        if (!existingAnswer) {
            throw new Error('Answer not found');
        }

        const answer = await Answer.findByIdAndUpdate(
            { _id: answerId },
            answerData,
            { new: true }
        );

        if (!answer) {
            throw new Error('Answer not found');
        }
        return answer;
    },

    deleteAnswer: async (answerId) => {
        const answer = await Answer.findById(answerId);
        if (!answer) {
            throw new Error('Answer not found');
        }

        await Answer.deleteOne({ _id: answerId });
        return answerId;
    }
};

module.exports = answerService;
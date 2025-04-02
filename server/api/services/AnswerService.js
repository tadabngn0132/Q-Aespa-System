const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');

const answerService = {
    getAnswers: async () => {
        return await Answer.find({})
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
    },
    
    getAnswersByQuestionId: async (questionId) => {
        return await Answer.find({ questionId: questionId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
    },

    getAnswerById: async (answerId) => {
        const answer = await Answer.findById(answerId);
        if(!answer) {
            throw new Error('Answer not found');
        }
        return answer;
    },

    getAnswersByUserId: async (userId) => {
        return await Answer.find({ userId: userId})
            .sort({ createdAt: -1 });
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
    },

    countAnswerByQuestionId: async (questionId) => {
        return Answer.countDocuments({ questionId: questionId });
    }
};

module.exports = answerService;
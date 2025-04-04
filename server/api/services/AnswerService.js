const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');
require('../models/QuestionModel');
const Question = mongoose.model('Question');
require('../models/UserModel');
const User = mongoose.model('User');
const emailService = require('./EmailService');

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
        const savedAnswer = await newAnswer.save();

        const question = await Question.findById(answerData.questionId)
            .populate('userId');
        
        if (question && question.userId) {
            const user = await User.findById(question.userId._id || question.userId);
            
            if (user) {
                try {
                    await emailService.sendAnswerNotification(
                        user.email,
                        user.name,
                        question.title,
                        question._id
                    );
                } catch (emailError) {
                    console.error('Error sending answer notification:', emailError);
                    // Continue since the answer was already created successfully
                }
            }
        }

        return savedAnswer;
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
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
require('../models/TagModel')
const Tag = mongoose.model('Tag');
require('../models/AnswerModel');
const Answer = mongoose.model('Answer');

const questionService = {
    getAllQuestions: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        return await Question.find({})
            .populate('tags', 'name _id')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    },

    getQuestionById: async (questionId) => {
        const question = await Question.findById(questionId);
        if (!questionId) {
            throw new Error('Question not found');
        }
        return await question.populate('tags', 'name _id');
    },

    getQuestionsByTagId: async (tagId) => {
        const questions = await Question.find({}).populate('tags', 'name _id');
        let questionsIncludeTag = [];

        for (const question of questions) {
            if (question.tags && Array.isArray(question.tags)) {
                const hasTag = question.tags.some(tag =>
                    tag._id.toString() === tagId
                );

                if (hasTag) {
                    questionsIncludeTag.push(question);
                }
            }
        }
        return questionsIncludeTag;
    },

    createQuestion: async (questionData) => {
        let tagIds = [];
        const tags = questionData.tags;
        for (const tagItem of tags) {
            let foundTag = await Tag.findOne({ name: tagItem.name });
            if (foundTag) {
                tagIds.push(foundTag._id);
            }
        }
        questionData.tags = tagIds;

        const newQuestion = new Question(questionData);
        return await newQuestion.save();
    },

    updateQuestion: async (questionId, questionData) => {
        const existingQuestion = await Question.findById(questionId);
        if (!existingQuestion) {
            throw new Error('Question not found');
        }

        if (questionData.tags && Array.isArray(questionData.tags)) {
            let tagIds = [];
            const tags = questionData.tags;
            for (const tagItem of tags) {
                let foundTag = await Tag.findOne({ name: tagItem.name });
                if (foundTag) {
                    tagIds.push(foundTag._id);
                }
            }
            questionData.tags = tagIds;
        }

        const question = await Question.findByIdAndUpdate(
            { _id: questionId },
            questionData,
            { new: true }
        );

        if (!question) {
            throw new Error('Question not found');
        }

        return question;
    },

    deleteQuestion: async (questionId) => {
        // Get question info before delete to delete image
        const question = await Question.findById(questionId);
        if (!question) {
            throw new Error('Question not found');
        }

        await Question.deleteOne({ _id: questionId });
        await Answer.deleteMany({ questionId: questionId });
        return questionId;
    }
};

module.exports = questionService;
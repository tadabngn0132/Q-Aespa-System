const mongoose = require('mongoose');
const Question = mongoose.model('Question');
require('../models/TagModel')
const Tag = mongoose.model('Tag');
require('../models/AnswerModel');
const Answer = mongoose.model('Answer');
const answerService = require('./AnswerService');
require('../models/VoteModel');
const Vote = mongoose.model('Vote');
const voteService = require('./VoteService');

const questionService = {
    getAllQuestions: async () => {
        const questions = await Question.find({})
            .populate('tags', 'name _id')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        const questionsWithScores = await Promise.all(
            questions.map(async (question) => {
                const score = await voteService.countVotes(question._id);
                const answerCount = await answerService.countAnswerByQuestionId(question._id);
                return {
                    ...question.toObject(),
                    score,
                    answerCount
                };
            })
        );
        
        return questionsWithScores;
    },

    getQuestionById: async (questionId) => {
        const question = await Question.findById(questionId)
            .populate('tags', 'name _id')
            .populate('userId', 'name email');
        const score = await voteService.countVotes(questionId);
        if (!questionId) {
            throw new Error('Question not found');
        }
        return {
            ...question.toObject(),
            score
        };
    },

    getQuestionsByTagId: async (tagId) => {
        return await Question.find({ tags: tagId })
                .populate('tags', 'name _id')
                .populate('userId', 'name email')
                .sort({ createdAt: -1 });
    },

    getQuestionByUserId: async (userId) => {
        const questions = await Question.find({}).populate('tags', 'name _id');
        let questionsIncludeUserId = [];

        for (const question of questions) {
            if (question.userId) {
                const hasUserId = question.userId.toString() === userId.toString();
                
                if (hasUserId) {
                    questionsIncludeUserId.push(question);
                }
            };
        }
        return questionsIncludeUserId;
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
        const question = await Question.findById(questionId);
        if (!question) {
            throw new Error('Question not found');
        }

        await Question.deleteOne({ _id: questionId });
        await Answer.deleteMany({ questionId: questionId });
        return questionId;
    },

    searchQuestionsByKeyword: async (keyword) => {
        try {
            let foundQuestions = await Question.find({
                $or: [
                    {"title": {"$regex": keyword, "$options": "i"}},
                    {"description": {"$regex": keyword, "$options": "i"}}
                ]
            }
            )
            .populate('tags', 'name _id')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
            
            const questionsWithScores = await Promise.all(
                foundQuestions.map(async (question) => {
                    const score = await voteService.countVotes(question._id);
                    const answerCount = await answerService.countAnswerByQuestionId(question._id);
                    return {
                        ...question.toObject(),
                        score,
                        answerCount
                    };
                })
            );
            
            return questionsWithScores;
        } catch (error) {
            throw error;
        }
    },

    getAllQuestionsAsc: async () => {
        const questions = await Question.find({})
            .populate('tags', 'name _id')
            .populate('userId', 'name email')
            .sort({ createdAt: 1 });

        const questionsWithScores = await Promise.all(
            questions.map(async (question) => {
                const score = await voteService.countVotes(question._id);
                const answerCount = await answerService.countAnswerByQuestionId(question._id);
                return {
                    ...question.toObject(),
                    score,
                    answerCount
                };
            })
        );
        
        return questionsWithScores;
    },

    getAllQuestionsUnanswered: async () => {
        const questions = await Question.find({})
            .populate('tags', 'name _id')
            .populate('userId', 'name email');
        
        const questionsWithScores = await Promise.all(
            questions.map(async (question) => {
                const score = await voteService.countVotes(question._id);
                const answerCount = await answerService.countAnswerByQuestionId(question._id);
                return {
                    ...question.toObject(),
                    score,
                    answerCount
                };
            })
        );
        
        return questionsWithScores.filter(question => question.answerCount === 0);
    },

    getAllQuestionsByScore: async () => {
        const questions = await Question.find({})
            .populate('tags', 'name _id')
            .populate('userId', 'name email');
        
        const questionsWithScores = await Promise.all(
            questions.map(async (question) => {
                const score = await voteService.countVotes(question._id);
                const answerCount = await answerService.countAnswerByQuestionId(question._id);
                return {
                    ...question.toObject(),
                    score,
                    answerCount
                };
            })
        );
        
        return questionsWithScores.sort((a, b) => b.score - a.score);
    },

    countQuestionByTag: async (tagId) => {
        const questionQuantity = await Question.countDocuments({ tags: tagId });
        
        return questionQuantity;
    },

    searchQuestionsByExactKeyword: async (keyword) => {
        try {
            let foundQuestions = await Question.find({
                $text: {
                    $search: `"${keyword}"`
                }
            })
            .populate('tags', 'name _id')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
            
            const questionsWithScores = await Promise.all(
                foundQuestions.map(async (question) => {
                    const score = await voteService.countVotes(question._id);
                    const answerCount = await answerService.countAnswerByQuestionId(question._id);
                    return {
                        ...question.toObject(),
                        score,
                        answerCount
                    };
                })
            );
            
            return questionsWithScores;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = questionService;
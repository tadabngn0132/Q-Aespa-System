const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const questionService = require('./QuestionService');

const tagService = {
    getAllTags: async () => {
        const tags = await Tag.find({})
            .sort({ createdAt: -1 });

        const tagsWithQuestionCount = await Promise.all(
            tags.map(async (tag) => {
                const questionQuantity = await questionService.countQuestionByTag(tag._id);
                return {
                    ...tag.toObject(),
                    questionQuantity
                };
            })
        );

        return tagsWithQuestionCount;
    },

    getTagById: async (tagId) => {
        const tag = await Tag.findById(tagId);
        if (!tag) {
            throw new Error('Tag not found')
        }
        return tag;
    },

    createTag: async (TagData) => {
        let existingTag = await Tag.findOne({ name: TagData.name});
        if (!existingTag) {
            const newTag = new Tag({
                name: TagData.name.toLowerCase(),
                description: TagData.description
            });
            return await newTag.save();
        } else {
            throw new Error('Tag already exists.');
        }
    },

    updateTag: async (tagId, TagData) => {
        const existingTag = await Tag.findById(tagId);

        if (!existingTag) {
            throw new Error('Tag not found');
        }

        TagData.name = TagData.name.toLowerCase();

        const tag = await Tag.findByIdAndUpdate(
            { _id: tagId },
            TagData,
            { new: true }
        );

        if (!tag) {
            throw new Error('Tag not found');
        }

        return tag;
    },
    
    deleteTag: async (tagId) => {
        const tag = await Tag.findById(tagId);

        if (!tag) {
            throw new Error('Tag not found');
        }

        await Tag.deleteOne({ _id: tagId });
        return tagId;
    },

    searchTagByKeywordAbsolute: async (keyword) => {
        try {
            const foundTag = await Tag.find(
                {"name": {"$search": keyword}}
            );

            if (!foundTag) {
                throw new Error('Tag not found');
            }
    
            return foundTag;
        } catch (error) {
            console.error("Finding tag keyword error", error);            
        }
    },

    getAllTagsByName: async () => {
        const tags = await Tag.find({})
            .sort({ name: 1 });

        const tagsWithQuestionCount = await Promise.all(
            tags.map(async (tag) => {
                const questionQuantity = await questionService.countQuestionByTag(tag._id);
                return {
                    ...tag.toObject(),
                    questionQuantity
                };
            })
        );

        return tagsWithQuestionCount;
    },

    getAllTagsByQuestionCount: async () => {
        const tags = await Tag.find({});

        const tagsWithQuestionCount = await Promise.all(
            tags.map(async (tag) => {
                const questionQuantity = await questionService.countQuestionByTag(tag._id);
                return {
                    ...tag.toObject(),
                    questionQuantity
                };
            })
        );

        return tagsWithQuestionCount.sort((a, b) => b.questionQuantity - a.questionQuantity);
    },

    getTagByTagName: async (tagName) => {
        return await Tag.findOne({ name: tagName.toLowerCase() });
    }
};

module.exports = tagService;
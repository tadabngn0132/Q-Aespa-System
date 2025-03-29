const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');

const tagService = {
    getAllTags: async () => {
        return await Tag.find({})
            .sort({ createdAt: 1 });
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
            const newTag = new Tag(TagData);
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
    }
};

module.exports = tagService;
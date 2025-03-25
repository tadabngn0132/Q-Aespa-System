const tagService = require('../services/TagService');

exports.list_all_tags = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const tags = await tagService.getAllTags(page, limit);
        res.json(tags);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.create_a_tag = async (req, res) => {
    try {
        const tag = await tagService.createTag(req.body);
        res.json(tag);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.read_a_tag = async (req, res) => {
    try {
        const tag = await tagService.getTagById(req.params.tagId);
        res.json(tag);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};

exports.update_a_tag = async (req, res) => {
    try {
        const tag = await tagService.updateTag(req.params.tagId, req.body);
        res.json(tag);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.delete_a_tag = async (req, res) => {
    try {
        const tagId = await tagService.deleteTag(req.params.tagId);
        res.json({
            message: 'Tag successfully deleted',
            _id: tagId
        });
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};
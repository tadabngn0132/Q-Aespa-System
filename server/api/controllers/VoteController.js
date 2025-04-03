const voteService = require('../services/VoteService');

exports.countVotes = async (req, res) => {
    try {
        const { id } = req.params;
        const score = await voteService.countVotes(id);
        res.json(score);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createVote = async (req, res) => {
    try {
        const { userId, targetId } = req.params;
        const { targetType, vote } = req.body;

        const newVote = await voteService.createVote(userId, targetId, targetType, vote);
        res.json(newVote);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateVote = async (req, res) => {
    try {
        const { voteId } = req.params;
        const { userId, targetId } = req.query;
        const { targetType, vote } = req.body;

        const voteData = {
            userId: userId,
            targetId: targetId,
            targetType: targetType,
            vote: vote
        }

        const updatedVote = await voteService.updateVote(voteId, voteData);
        res.json(updatedVote);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteVote = async (req, res) => {
    try {
        const { voteId } = req.params;

        const deletedVote = await voteService.deleteVote(voteId);
        res.json(deletedVote);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.listVotesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const votes = await voteService.getVotesByUserId(userId);
        res.json(votes);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
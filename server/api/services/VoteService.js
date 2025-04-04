const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');

const voteService = {
    countVotes: async (id) => {
        const upvotes = await Vote.countDocuments({
            targetId: id,
            vote: 'up'
        });
        
        const downvotes = await Vote.countDocuments({
            targetId: id,
            vote: 'down'
        });
        
        return upvotes - downvotes;
    },

    createVote: async (userId, targetId, targetType, vote) => {
        const newVote = new Vote({
            userId: userId,
            targetType: targetType,
            targetId: targetId,
            vote: vote
        });

        return await newVote.save();
    },

    updateVote: async (voteId, voteData) => {
        const existingVote = await Vote.findById(voteId);
        if (!existingVote) {
            voteService.createVote(voteData.userId, voteData.targetId,
                                    voteData.targetType, voteData.vote);
            return;
        }

        const vote = await Vote.findByIdAndUpdate(
            { _id: voteId },
            voteData,
            { new: true }
        );

        if (!vote) {
            throw new Error('Vote not found');
        }

        return vote;
    },

    deleteVote: async (voteId) => {
        const vote = await Vote.findById(voteId);
        if (!vote) {
            throw new Error('Vote not found');
        }

        await Vote.deleteOne({ _id: voteId });
        return voteId;
    },

    getVotesByUserId: async (userId) => {
        const votes = await Vote.find({ userId: userId })
            .populate('userId', 'name email');

        return votes;
    }
}

module.exports = voteService;
const mongoose = require('mongoose');
const Vote = mongoose.model('Vote');

const voteService = {
    countVotes: async (id) => {
        const upvotes = await Vote.countDocuments({
            targetType: 'Question',
            targetId: id,
            vote: 'up'
        });
        
        const downvotes = await Vote.countDocuments({
            targetType: 'Question',
            targetId: id,
            vote: 'down'
        });
        
        return upvotes - downvotes;
    }
}

module.exports = voteService;
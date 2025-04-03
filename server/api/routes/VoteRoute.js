const VoteBuilder = require('../controllers/VoteController');

module.exports = app => {
    app
        .route('/votes/:id')
        .get(VoteBuilder.countVotes);
    app
        .route('/votes/delete/:voteId')
        .delete(VoteBuilder.deleteVote);
    app
        .route('/votes/:userId/:targetId')
        .post(VoteBuilder.createVote);
    app
        .route('/votes/:voteId/update')
        .put(VoteBuilder.updateVote);
    app
        .route('/votes/user/:userId')
        .get(VoteBuilder.listVotesByUserId);
};
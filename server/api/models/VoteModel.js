const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoteSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        targetType: {
            type: String,
            enum: ['Question', 'Answer'],
            required: true
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'targetType'
        },
        vote: {
            type: String,
            enum: ['up', 'down'],
            required: true
        }
    },
    {
        collection: 'Votes',
        timestamps: true
    }
);

VoteSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });
VoteSchema.index({ createdAt: -1 });
VoteSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Vote', VoteSchema);
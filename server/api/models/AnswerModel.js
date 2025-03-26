const mongoose = require('mongoose');

const { Schema } = mongoose;

const AnswerSchema = new Schema(
    {
        description: {
            type: String,
            required: [true, 'Description can not blank!'],
            minlength: [20, 'Description must be at least 20 characters']
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        collection: 'Answers',
        timestamps: true
    }
);

// Text index for search by keyword
AnswerSchema.index({ description: 'text' });

// Index for arrange created time
AnswerSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Answer', AnswerSchema);
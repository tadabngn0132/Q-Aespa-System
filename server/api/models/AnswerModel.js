const mongoose = require('mongoose');
const Question = mongoose.model('Question');

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
const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title can not be blank!'],
            trim: true,
            minlength: [12, 'Title must be at least 12 characters!'],
            maxlength: [200, 'Title can not exceed 200 characters!']
        },
        description: {
            type: String,
            required: [true, 'Description can not be blank!'],
            minlength: [20, 'Description must be at least 20 characters!'],
            maxlength: [10000, 'Description can not exceed 10000 characters!']
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',
                required: true
            }
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { 
        collection: 'Questions',
        timestamps: true
    }
);
// Text index for search by keyword
QuestionSchema.index({ title: 1 });
QuestionSchema.index({ description: 1 });

// Index for arrange by and created time (desc) and (asc) 
QuestionSchema.index({ createdAt: -1 });

QuestionSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Question', QuestionSchema);
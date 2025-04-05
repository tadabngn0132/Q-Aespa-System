const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name can not be blank!'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters.'],
            maxlength: [35, 'Name can not exceed 35 characters.']
        },
        description: {
            type: String,
            required: [true, 'Description can not be blank!'],
            minlength: [20, 'Description must be at least 20 characters'],
            maxlength: [10000, 'Description can not exceed 10000 characters!']
        }
    },
    {
        collection: 'Tags',
        timestamps: true
    }
);

TagSchema.index({ name: 'text' });
TagSchema.index({ name: 1 })

module.exports = mongoose.model('Tag', TagSchema);
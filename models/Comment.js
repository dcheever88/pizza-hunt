const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment_id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'No reply entered!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'Tell us who you are!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
        },
        {
            toJSON: {
                getters: true
            }
        }
    );

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: 'Tell us who you are!',
        trim: true
    },
    commentBody: {
        type: String,
        required: 'No comment entered!',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
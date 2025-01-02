import { Schema, model } from 'mongoose';
import reactionSchema from './reaction.js';
const thoughtSchema = new Schema({
    thought: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], // Array of reactions
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true,
    id: false,
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length; // Virtual field to get the count of reactions
});
const Thought = model('Thought', thoughtSchema);
export default Thought;

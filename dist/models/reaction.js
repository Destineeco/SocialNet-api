import { Schema } from 'mongoose';
const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280, // Ensure the reaction is not too long
    },
    username: {
        type: String,
        required: true, // Ensure the user who posted the reaction is included
    },
}, {
    toJSON: {
        getters: true, // Allows for custom transformation of the reaction document (e.g., adding getters or virtuals)
    },
    timestamps: true, // Automatically add createdAt and updatedAt fields
    id: false, // Prevent the creation of an additional "id" field
});
export default reactionSchema;

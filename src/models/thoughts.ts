import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './reaction.js';

interface IThought extends Document {
  thought: string;
  username: string;
  reactions: typeof reactionSchema[];
}

const thoughtSchema = new Schema<IThought>(
  {
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
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Virtual field to get the count of reactions
});

const Thought = model('Thought', thoughtSchema);

export default Thought;

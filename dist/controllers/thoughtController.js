import { Thought, User } from '../models/index.js';
// Get all thoughts
export const getThoughts = async (_req, res) => {
    try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
        res.json(dbThoughtData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// Get a single thought by _id
export const getSingleThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.findById(req.params.thoughtId);
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID!' });
        }
        else {
            res.json(dbThoughtData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// Create a thought
export const createThought = async (req, res) => {
    try {
        const { thought, username } = req.body;
        // Create the thought
        const dbThoughtData = await Thought.create({ thought, username });
        // Find the user by username and add the new thought's ID to their thoughts array
        const dbUserData = await User.findOneAndUpdate({ username }, { $push: { thoughts: dbThoughtData._id } }, // Storing the ObjectId in the user
        { new: true });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this username!' });
            return;
        }
        res.json({ message: 'Thought created successfully!' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// Update a thought by _id
export const updateThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, { $set: req.body }, { runValidators: true, new: true });
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID to update!' });
        }
        else {
            res.json(dbThoughtData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// Delete a thought by _id
export const deleteThought = async (req, res) => {
    try {
        const dbThoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID to delete!' });
        }
        else {
            // Now remove the thought's _id from the user's thoughts array
            await User.updateMany({ thoughts: dbThoughtData._id }, { $pull: { thoughts: dbThoughtData._id } });
            res.json({ message: 'Thought successfully deleted!' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// Add reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params; // Get the thought ID from the URL params
        const { reactionBody, username } = req.body; // Extract the reaction data from the request body
        // Find the thought and update its reactions
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: thoughtId }, // Find the thought by ID
        { $addToSet: { reactions: { reactionBody, username } } }, // Add the new reaction
        { new: true, runValidators: true } // Return the updated thought and validate it
        );
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID!' });
        }
        else {
            res.json(dbThoughtData); // Send the updated thought with the new reaction
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err); // Handle server error
    }
};
// Remove a reaction from a thought (by thoughtId and reactionId)
export const removeReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        // Find the thought and remove the reaction by its reactionId
        const dbThoughtData = await Thought.findByIdAndUpdate(thoughtId, // Find the thought by its _id
        { $pull: { reactions: { _id: reactionId } } }, // Remove the reaction by its _id
        { runValidators: true, new: true } // Return the updated thought and validate
        );
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID to remove a reaction from!' });
        }
        else {
            res.json(dbThoughtData); // Send the updated thought with the reaction removed
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err); // Handle server error
    }
};

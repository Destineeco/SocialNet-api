import { User, Thought } from '../models/index.js';
// get all users
export const getUsers = async (_req, res) => {
    try {
        const dbUserData = await User.find().select('-__v');
        res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// get single user by username
export const getSingleUser = async (req, res) => {
    try {
        const dbUserData = await User.findOne({ username: req.params.username })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this username!' });
        }
        else {
            res.json(dbUserData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// update a user
export const updateUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, { runValidators: true, new: true });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this username!' });
        }
        else {
            res.json(dbUserData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// delete user and thoughts
export const deleteUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ username: req.params.username });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this username!' });
        }
        else {
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
// In userController.ts
export const addFriend = async (req, res) => {
    try {
        const { username } = req.params;
        const { friendname } = req.params; // Access friendname from params
        const dbUserData = await User.findOneAndUpdate({ username }, { $addToSet: { friends: friendname } }, { new: true });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this username!' });
        }
        else {
            res.json(dbUserData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
export const removeFriend = async (req, res) => {
    try {
        const { username } = req.params;
        const { friendname } = req.params; // Access friendname from params
        const dbUserData = await User.findOneAndUpdate({ username }, { $pull: { friends: friendname } }, { new: true });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this username!' });
        }
        else {
            res.json(dbUserData);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

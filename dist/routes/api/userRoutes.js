import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:username  // Updated to get user by username
router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/users/:username/friends/:friendId  // Updated to get user by username
router.route('/:username/friends/:friendname').post(addFriend).delete(removeFriend);
export { router as userRoutes };

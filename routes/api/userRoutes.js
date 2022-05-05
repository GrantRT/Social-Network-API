const router = require('express').Router();
const { getAllUsers, getUserById, createUser, editUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(editUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;

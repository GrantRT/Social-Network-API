const { User } = require('../models');

const userController = {
  // Get all the users
  getAllUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Get an individual user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
          return;
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // edit a user
  editUser({ params, body }, res) {
    // find the user by its ID and then update its body
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
          return;
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a user
  deleteUser({ params }, res) {
    // find the user by ID and then delete
    User.findOneAndDelete({ _id: params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
          return;
        } else {
          res.json({ message: 'User deleted' });
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a friend
  addFriend({ params }, res) {
    // find friend by ID and then add to friends set
    User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: params.friendId } }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
          return;
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a friend
  deleteFriend({ params }, res) {
    // find friend by ID and pull from friends
    User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
          return;
        } else {
          res.json({ message: 'Friend deleted' });
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;

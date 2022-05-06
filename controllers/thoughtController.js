const { Thought, Reaction, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // Get one thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate('reactions')
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
          return;
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create a thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thought) => {
        // find the user that created the thought and push to the thoughts array
        User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: thought._id } }, { new: true })
          .then((user) => {
            if (!user) {
              res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
              return;
            }
            res.json(user);
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // Edit a thought
  editThought({ params, body }, res) {
    // Find thought by ID and update the body
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a thought
  deleteThought({ params }, res) {
    // find the user by ID and then delete
    Thought.findOneAndDelete({ _id: params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
          return;
        } else {
          res.json({ message: 'Thought deleted' });
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Post a reaction
  addReaction({ params, body }, res) {
    // find thought by ID and add reaction to reactions set
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true, runValidators: true })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a reaction
  deleteReaction({ params, body }, res) {
    // find the thought by ID and then remove the reaction via the reaction ID
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: body.reactionId } } }, { new: true, runValidators: true })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json({ message: 'Reaction deleted' });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;

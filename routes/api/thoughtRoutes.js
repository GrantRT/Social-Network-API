const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, editThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getThoughtById).put(editThought).delete(deleteThought);

router.route('/:thoughtId/reactions/').post(addReaction).delete(deleteReaction);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAll, getAllAnswersOfQuestion, createOne } = require('../controllers/questionsControllers');

router.route('/').get(getAll).post(createOne);
router.route('/:question_id/answers').get(getAllAnswersOfQuestion);

module.exports = router;

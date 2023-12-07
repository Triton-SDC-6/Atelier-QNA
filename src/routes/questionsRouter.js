const express = require('express');
const router = express.Router();
const { getAll, getAllAnswersOfQuestion } = require('../controllers/questionsControllers');

router.route('/').get(getAll);
router.route('/:question_id/answers').get(getAllAnswersOfQuestion);

module.exports = router;

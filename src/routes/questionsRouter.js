const express = require('express');
const router = express.Router();
const {
  getAll,
  getAllAnswersOfQuestion,
  createOne
} = require('../controllers/questionsControllers');
const questionBodyChecker = require('../middlewares/questionBodyChecker');

router.route('/').get(getAll).post(questionBodyChecker, createOne);
router.route('/:question_id/answers').get(getAllAnswersOfQuestion);

module.exports = router;

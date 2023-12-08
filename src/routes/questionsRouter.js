const express = require('express');
const router = express.Router();
const {
  getAll,
  getAllAnswersOfQuestion,
  createOneQuestion,
  createOneAnswer,
  markQuestionHelpful,
  reportQuestion
} = require('../controllers/questionsControllers');
const questionBodyChecker = require('../middlewares/questionBodyChecker');
const answerBodyChecker = require('../middlewares/answerBodyChecker');

router.route('/').get(getAll).post(questionBodyChecker, createOneQuestion);
router
  .route('/:question_id/answers')
  .get(getAllAnswersOfQuestion)
  .post(answerBodyChecker, createOneAnswer);

router.route('/:question_id/helpful').put(markQuestionHelpful);
router.route('/:question_id/report').put(reportQuestion);
module.exports = router;

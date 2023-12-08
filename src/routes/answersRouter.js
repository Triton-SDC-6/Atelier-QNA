const express = require('express');
const router = express.Router();
const {
  markAnswerHelpful,
  reportAnswer
} = require('../controllers/answersControllers');

router.route('/:answer_id/helpful').put(markAnswerHelpful);
router.route('/:answer_id/report').put(reportAnswer);

module.exports = router;

const { pool } = require('./Questions');

async function getAllByQuestionId(questionId) {
  const answersQuery = 'SELECT * FROM answers WHERE question_id = $1';
  const answers = await pool.query(answersQuery, [questionId]);
  return answers.rows;
}

module.exports.getAllByQuestionId = getAllByQuestionId;

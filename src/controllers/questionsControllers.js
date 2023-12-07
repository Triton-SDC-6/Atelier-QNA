const Questions = require('../models/Questions');

async function getAll(req, res) {
  const data = await Questions.getAll(1, 1, 5);
  res.send(data);
}

module.exports.getAll = getAll;

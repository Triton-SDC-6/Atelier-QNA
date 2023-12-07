const Questions = require('../models/Questions');

async function getAll(req, res) {
  const { product_id, page=1, count=2 } = req.query;
  const data = await Questions.getAll(product_id, page, count);
  res.send(data);
}

module.exports.getAll = getAll;

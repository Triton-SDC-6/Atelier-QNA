function questionBodyChecker(req, res, next) {
  // FIXME: check if questionbody is valid
  console.log('Question body checker hit!')
  next();
}

module.exports = questionBodyChecker;

function answerBodyChecker(req, res, next) {
  // FIXME: check if questionbody is valid
  console.log('Answer body checker hit!')
  next();
}

module.exports = answerBodyChecker;

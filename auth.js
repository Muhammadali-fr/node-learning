function auth(req, res, next) {
  console.log("authintifikatsiya ...");
  next();
}

module.exports = auth;
